"use client"
import { Skeleton } from "@/components/ui/skeleton";

const ViewFilterLoader = () => {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-20 w-full rounded-none" />
        <Skeleton className="h-20 w-full rounded-none" />
      </div>
    </div>
  );
};

export default ViewFilterLoader;
