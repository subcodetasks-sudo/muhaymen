"use client";

import { useEffect, useState } from "react";
import { CircleCheck, OctagonX } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ThemedToastTone = "success" | "error";

type ThemedToastProps = {
  message: string;
  tone?: ThemedToastTone;
  toastId: string | number;
};

export function ThemedToast({
  message,
  tone = "success",
  toastId,
}: ThemedToastProps) {
  const Icon = tone === "success" ? CircleCheck : OctagonX;
  // Backdrop-filter ghosts while Sonner transforms the toast in — enable after enter.
  const [blurReady, setBlurReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setBlurReady(true), 420);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      onClick={() => toast.dismiss(toastId)}
      className={cn(
        "flex w-[min(100vw-2rem,22rem)] items-center gap-3 rounded-2xl border px-4 py-3.5 text-start",
        "border-primary text-sm font-semibold text-foreground shadow-sm",
        "bg-[color-mix(in_oklab,var(--primary)_28%,white)]",
        "transition-[background-color,backdrop-filter] duration-200",
        blurReady &&
          "bg-[color-mix(in_oklab,var(--primary)_22%,transparent)] backdrop-blur-xl",
        "hover:bg-[color-mix(in_oklab,var(--primary)_32%,white)]",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          tone === "success" && "bg-emerald-500/15 text-emerald-600",
          tone === "error" && "bg-destructive/15 text-destructive",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1 leading-snug">{message}</span>
    </button>
  );
}

export function showSuccessToast(message: string) {
  return toast.custom((toastId) => (
    <ThemedToast message={message} tone="success" toastId={toastId} />
  ));
}

export function showErrorToast(message: string) {
  return toast.custom((toastId) => (
    <ThemedToast message={message} tone="error" toastId={toastId} />
  ));
}
