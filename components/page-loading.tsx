"use client";

import { motion } from "motion/react";
import { EyeIcon } from "@/components/eye-icon";
import { cn } from "@/lib/utils";

type PageLoadingProps = {
  className?: string;
  fullHeight?: boolean;
};

export function PageLoading({ className, fullHeight = true }: PageLoadingProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden bg-background",
        fullHeight ? "min-h-dvh flex-1" : "py-16",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.79_0.16_85/0.12),transparent_65%)]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-6"
      >
        <div className="relative flex size-28 items-center justify-center">
          {[0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              aria-hidden
              className="absolute inset-0 rounded-full border border-primary/25"
              animate={{
                scale: [1, 1.55 + ring * 0.12],
                opacity: [0.45 - ring * 0.1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: ring * 0.35,
              }}
            />
          ))}

          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <motion.div
              animate={{ scaleY: [1, 0.12, 1] }}
              transition={{
                duration: 3.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.45, 0, 0.55, 1],
                times: [0, 0.06, 0.12],
                repeatDelay: 2.4,
              }}
              className="origin-center"
            >
              <EyeIcon size={52} pupilClassName="fill-primary-foreground" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-1.5"
        >
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              aria-hidden
              className="size-1.5 rounded-full bg-primary/80"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85] }}
              transition={{
                duration: 1.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: dot * 0.18,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
