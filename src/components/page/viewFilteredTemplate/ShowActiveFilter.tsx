"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";
import { useSearchParams } from "next/navigation";

const ShowActiveFilter = () => {
  const searchParams = useSearchParams();
  const depTags = searchParams.getAll("pkg");
  const { removeSearchParam } = useMultiSearchParam();
  return (
    <TooltipProvider>
      <div className="flex gap-2 text-muted-foreground items-center">

        {depTags.length > 0 && <span className="text-sm">Active filters:</span>}
      <div className="flex gap-2">
        {depTags.map((tag) => (
          <Tooltip key={tag}>
            <TooltipTrigger>
              <Badge
                variant={"secondary"}
                className="hover:bg-red-700 hover:cursor-pointer"
                onClick={() => removeSearchParam("pkg", tag)}
              >
                {tag}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove {tag} filter</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      </div>
    </TooltipProvider>
  );
};

export default ShowActiveFilter;
