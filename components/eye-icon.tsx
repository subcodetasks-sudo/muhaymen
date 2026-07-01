import { cn } from "@/lib/utils";

type EyeIconProps = {
  className?: string;
  size?: number;
  pupilClassName?: string;
};

export function EyeIcon({
  className,
  size = 36,
  pupilClassName,
}: EyeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
      className={cn("text-primary", className)}
    >
      <path
        d="M 11 5 H 26.5 C 29.5 5 31 6.5 31 9.5 V 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 25 31 H 9.5 C 6.5 31 5 29.5 5 26.5 V 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 10 17.5 Q 18 13.5 26 17.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 10 18.5 Q 18 22.5 26 18.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="18"
        cy="18"
        r="2.75"
        className={cn("fill-foreground", pupilClassName)}
      />
    </svg>
  );
}
