import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-xl border bg-card p-5 space-y-4">
        <div className="h-2 rounded-full bg-muted w-full" />
        <div className="pt-2 space-y-3">
          <Skeleton className="h-5 w-3/4 rounded-lg" />
          <Skeleton className="h-8 w-1/3 rounded-lg" />
          <Skeleton className="h-10 w-full rounded-xl mt-3" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingState;
