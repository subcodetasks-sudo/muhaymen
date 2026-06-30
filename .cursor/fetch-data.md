# Fetch Data & CMS Integration

Use this guide when wiring CMS endpoints, server prefetch, React Query hydration, SEO metadata, JSON-LD, loading states, images, or locale-aware requests on the landing page and similar features.

Cross-reference: @architecture.md, @react-query.md, @server-first.md, @i18n.md.

---

## 1. Default pattern: server prefetch + hydration (home)

Landing CMS uses **server `prefetchQuery`** + **`HydrationBoundary`** + **client `useHeroContent`** — not client-only `useQuery`, not prop drilling.

```
app/[locale]/page.tsx          → generateMetadata() via cms.ts
landing-page.tsx (server)      → prefetchQuery + HydrationBoundary
hero-section.tsx (server)      → JSON-LD via getHeroContent; HeroSectionClient
hero-section-client.tsx        → useHeroContent(locale) + motion
whatsapp-section.tsx (client)  → useHeroContent(locale) — same queryKey, deduped
lib/cms.ts                     → getHeroContent (server fetch + react cache)
lib/query-keys.ts              → landingCmsKeys factory
hooks/use-hero-content.ts      → useQuery for client consumers
lib/get-query-client.ts        → shared QueryClient (server + browser)
```

**Why this pattern:**

- `queryFn` runs on the **server** during `prefetchQuery` → data in dehydrated cache.
- Client `useQuery` reads hydrated cache instantly (no loading flash when prefetch succeeds).
- JSON-LD and `generateMetadata` still use `getHeroContent` from `cms.ts` (in initial HTML).
- Hero + WhatsApp share one endpoint via the same `landingCmsKeys.hero(locale)` — no duplicate props.

**Scope:** Prefetch + `HydrationBoundary` live in `landing-page.tsx` (home only). Other routes (`/articles`) are unaffected.

---

## 2. API client (`lib/api.ts`)

- **Base URL:** `NEXT_PUBLIC_SITE_URL` (with protocol, no trailing slash) + `/api/v1/`.
- **Always use** `fetchApi<T>(path, options)` — never raw `fetch` to CMS URLs in feature code.
- **Paths:** Relative to `/api/v1/` (e.g. `"/content/hero"`).
- **Locale header:** Pass `locale: "ar" | "en"`; `fetchApi` sets `Accept-Language` automatically.
- **Errors:** `fetchApi` throws `ApiError` with `status` and `body` on non-2xx responses.

### Server fetch vs client fetch

| | Server (`prefetchQuery`, `cms.ts`) | Client (`useQuery` after hydrate) |
|---|-------------------------------------|-----------------------------------|
| Runs in | Node during SSR | Browser; cache already filled |
| First paint | Prefetched data available | Reads hydrated cache |
| Used for | Landing prefetch, metadata, JSON-LD | Section UI, refetch on client |

### TLS (dev / incomplete certs)

Node server fetch may fail with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` while the browser succeeds. `lib/api.ts` bypasses TLS verification in development via `node:https`.

- **Env:** `API_INSECURE_TLS` — permissive in `development` by default, strict in `production`.
- Set `API_INSECURE_TLS=true` in `.env.local` only when the API host still has cert issues locally.

---

## 3. CMS service (`features/landing-page/lib/cms.ts`)

Server-side fetch + SEO helpers:

- `getHeroContent(locale)` — `fetchApi` + `react` `cache()` + `next: { revalidate: 60 }`
- `getHeroSeoText(content)` — strip HTML for `<title>` / meta description
- `buildHomeJsonLd(content, locale)` — homepage structured data

Used by: `prefetchQuery` `queryFn`, `generateMetadata`, and `hero-section.tsx` JSON-LD. `cache()` dedupes within one request.

### Query keys (`features/landing-page/lib/query-keys.ts`)

Per @react-query.md — never inline string arrays:

```typescript
export const landingCmsKeys = {
  all: ["landing-cms"] as const,
  hero: (locale: AppLocale) => [...landingCmsKeys.all, "hero", locale] as const,
};
```

### Hook (`features/landing-page/hooks/use-hero-content.ts`)

```typescript
useQuery({
  queryKey: landingCmsKeys.hero(locale),
  queryFn: async () => {
    const response = await fetchApi<HeroContentResponse>("/content/hero", { locale });
    return response.data;
  },
});
```

Prefetch in `landing-page.tsx` must use the **same `queryKey`** and equivalent `queryFn` (via `getHeroContent`).

### Adding a new CMS section

1. Add DTO types to `features/landing-page/types/`.
2. Add cached fetcher to `cms.ts` + key in `query-keys.ts`.
3. `prefetchQuery` in `landing-page.tsx` (extend prefetch list).
4. Client section uses matching `useQuery` hook — no prop drilling.

---

## 4. Prefetch in `landing-page.tsx`

```typescript
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";

const queryClient = getQueryClient();
await queryClient.prefetchQuery({
  queryKey: landingCmsKeys.hero(locale),
  queryFn: () => getHeroContent(locale),
});

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    {/* sections */}
  </HydrationBoundary>
);
```

`HydrationBoundary` must be inside root `QueryClientProvider` (`app/providers.tsx` → `lib/get-query-client.ts`).

---

## 5. Section split: server JSON-LD + client UI

| File | Type | Responsibility |
|------|------|----------------|
| `landing-page.tsx` | Server | `prefetchQuery` + `HydrationBoundary` |
| `hero-section.tsx` | Server | JSON-LD `<script>`; `getHeroContent` for schema only |
| `hero-section-client.tsx` | Client | `useHeroContent`, motion / `useScroll` |
| `whatsapp-section.tsx` | Client | `useHeroContent` → `data.section` |

### Hero rules

- **JSON-LD** only in `hero-section.tsx` (server).
- **Animations** only in `hero-section-client.tsx`.
- If `useScroll` causes hydration errors, use `next/dynamic(..., { ssr: false })` from the server parent.
- **Never** use `useEffect` + `setState(true)` for mount detection.

### Metadata

`app/[locale]/page.tsx` → `generateMetadata()` uses `getHeroContent` + `getHeroSeoText`, with translation fallback on error.

---

## 6. Types (DTOs)

- Place response types in `features/[feature-name]/types/`.
- **Always model the API envelope:**

```typescript
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
```

- **Check-before-type:** Fetch a real sample before finalizing types. Use `string | null` where the API returns `null`.

---

## 7. CMS HTML rendering

- Render rich text with `dangerouslySetInnerHTML` **inline** on `<div>` (not nested `<p>` / `<h1>`).
- Use `[&_p]:contents` / `[&_p]:inline` as needed.
- CTA labels stay in translation files unless explicitly from CMS.

---

## 8. CMS images

- Use `unoptimized` on CMS `next/image` until API TLS is fixed.
- Add `images.remotePatterns` in `next.config.ts`.
- Fallback icon when `url` is `null`.

---

## 9. Loading UI

- After successful prefetch, client sections should have data immediately — **no skeleton** on happy path.
- Use shadcn `Skeleton` only as fallback when `isPending && !data` (prefetch failed or slow network).
- No custom `animate-pulse` divs.

---

## 10. New section checklist

```
- [ ] DTO types + ApiResponse<T>
- [ ] Cached fetcher in cms.ts + query key in query-keys.ts
- [ ] prefetchQuery in landing-page.tsx (same queryKey as hook)
- [ ] useQuery hook for client section(s)
- [ ] generateMetadata / JSON-LD on server where needed
- [ ] HTML on <div>, not nested <p>
- [ ] CMS images: unoptimized + remotePatterns + null fallback
- [ ] Motion in *-client.tsx only
```

---

## 11. Reference implementation

| Piece | Location |
|-------|----------|
| API helper | `lib/api.ts` |
| QueryClient (shared) | `lib/get-query-client.ts` |
| Query provider | `app/providers.tsx` |
| CMS server layer | `features/landing-page/lib/cms.ts` |
| Query keys | `features/landing-page/lib/query-keys.ts` |
| Hero hook | `features/landing-page/hooks/use-hero-content.ts` |
| Prefetch + boundary | `features/landing-page/components/landing-page.tsx` |
| Page metadata | `app/[locale]/page.tsx` |
| Hero JSON-LD (server) | `features/landing-page/components/hero-section.tsx` |
| Hero animations (client) | `features/landing-page/components/hero-section-client.tsx` |
| WhatsApp (client hook) | `features/landing-page/components/whatsapp-section.tsx` |
| Types | `features/landing-page/types/index.ts` |

---

## 12. Anti-patterns

- ❌ Client-only `useQuery` without server `prefetchQuery` on landing CMS
- ❌ JSON-LD inside `"use client"` components
- ❌ Prop drilling CMS data when a shared `queryKey` + prefetch suffices
- ❌ Inline query key arrays (use `query-keys.ts`)
- ❌ Separate `get-*` / `use-*` / `*-json-ld` files per section
- ❌ `useEffect` + `setIsMounted` for scroll/motion
- ❌ `next/image` without `unoptimized` for CMS host with bad TLS in dev
- ❌ Wrapping CMS `<p>…</p>` inside `<p>` or `<h1>`
