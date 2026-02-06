import { Skeleton } from "../ui/skeleton";

export function AddressListSkeletonCompact() {
  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between px-1 py-2">
        <Skeleton className="h-7 w-40" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-52" />
        </div>
      </div>

      {/* Addresses */}
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`
              rounded-lg border p-4
            `}
          >
            <div className="flex gap-3">
              <Skeleton className="mt-0.5 h-5 w-5 rounded-full" />

              <div className="flex-1 space-y-2.5">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-3/4 max-w-sm" />
                <Skeleton className="h-4 w-44" />
                <div className="flex gap-3 pt-1">
                  <Skeleton className="h-8 w-14" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="py-3 text-center">
        <Skeleton className="inline-block h-6 w-44" />
      </div>
    </div>
  );
}
