import Skeleton from "./Skelteton";

export default function ProjectListSkeleton() {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 space-y-3 bg-white shadow"
        >
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-8 w-32" />
        </div>
      ))}
    </div>
  );
}
