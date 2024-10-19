"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@nextui-org/spinner";

const ViewFilterLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
        <Spinner size="md" color="primary" />
      </div>
  );
};

export default ViewFilterLoader;
