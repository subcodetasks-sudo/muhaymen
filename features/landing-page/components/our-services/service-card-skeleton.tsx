import { Skeleton } from "@/components/react-bits/ui/skeleton";
import { cn } from "@/lib/utils";

type ServiceCardSkeletonProps = {
  className?: string;
};

export function ServiceCardSkeleton({ className }: ServiceCardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <div className="p-1">
        <Skeleton className="aspect-4/3 w-full rounded-2xl border border-border/70" />
      </div>
      <div className="flex items-end justify-between gap-4 px-4 pb-4">
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
      </div>
    </div>
  );
}
