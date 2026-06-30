import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

const API_PREFIX = "/api/v1";

function shouldAllowInsecureTls(): boolean {
  if (process.env.API_INSECURE_TLS === "false") return false;
  if (process.env.API_INSECURE_TLS === "true") return true;
  return process.env.NODE_ENV === "development";
}

async function nodeRequest(
  url: string,
  options: {
    method?: string;
    headers: Headers;
    body?: BodyInit | null;
    rejectUnauthorized: boolean;
  },
): Promise<Response> {
  const parsed = new URL(url);
  const isHttps = parsed.protocol === "https:";
  const requestModule = isHttps ? https : http;

  const body =
    options.body === undefined || options.body === null
      ? undefined
      : typeof options.body === "string"
        ? options.body
        : await new Response(options.body).text();

  return new Promise((resolve, reject) => {
    const req = requestModule.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: `${parsed.pathname}${parsed.search}`,
        method: options.method ?? "GET",
        headers: Object.fromEntries(options.headers.entries()),
        ...(isHttps ? { rejectUnauthorized: options.rejectUnauthorized } : {}),
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          const responseHeaders = new Headers();
          for (const [key, value] of Object.entries(res.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const item of value) responseHeaders.append(key, item);
            } else {
              responseHeaders.set(key, value);
            }
          }

          resolve(
            new Response(Buffer.concat(chunks), {
              status: res.statusCode ?? 500,
              statusText: res.statusMessage ?? "",
              headers: responseHeaders,
            }),
          );
        });
      },
    );

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function requestApi(
  url: string,
  fetchOptions: Omit<FetchApiOptions, "locale">,
  headers: Headers,
): Promise<Response> {
  const { next: _next, ...requestInit } = fetchOptions;

  if (typeof window === "undefined" && shouldAllowInsecureTls()) {
    return nodeRequest(url, {
      method: requestInit.method,
      headers,
      body: requestInit.body,
      rejectUnauthorized: false,
    });
  }

  return fetch(url, {
    ...fetchOptions,
    headers,
  });
}

function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }

  return siteUrl.replace(/\/$/, "");
}

export function getApiBaseUrl(): string {
  return `${getSiteUrl()}${API_PREFIX}`;
}

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type FetchApiOptions = RequestInit & {
  locale?: string;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export async function fetchApi<T>(
  path: string,
  options: FetchApiOptions = {},
): Promise<T> {
  const { locale, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);

  if (locale) {
    headers.set("Accept-Language", locale);
  }

  if (
    fetchOptions.body !== undefined &&
    !(fetchOptions.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await requestApi(apiUrl(path), fetchOptions, headers);

  if (!response.ok) {
    const body = await parseResponseBody(response);
    throw new ApiError(
      `API request failed: ${response.status} ${response.statusText}`,
      response.status,
      body,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return parseResponseBody(response) as Promise<T>;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}
