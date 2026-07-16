"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-center"
      gap={12}
      offset={24}
      visibleToasts={4}
      className="landing-page"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "bg-transparent! border-none! shadow-none! p-0! w-auto!",
        },
      }}
      {...props}
    />
  );
}
