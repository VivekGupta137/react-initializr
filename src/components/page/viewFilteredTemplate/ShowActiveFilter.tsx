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
import ClosingBadge from "./ClosingBadge";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

const ShowActiveFilter = () => {
  const searchParams = useSearchParams();
  const depTags = searchParams.getAll("pkg");
  const { removeSearchParam, clearAllSearchParam } = useMultiSearchParam();
  const handleClose = (tag: string) => {
    removeSearchParam("pkg", tag)
  }
  return (
    <AnimatePresence>
      {depTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
          layoutId={JSON.stringify(searchParams)}
        >
          <TooltipProvider>
            <div className="flex gap-2 text-muted-foreground items-start">
              
              <motion.div layout className="flex gap-2 flex-wrap">
              <span className="text-sm shrink-0">Active filters:</span>
                {depTags.map((tag) => (
                  
                    <Tooltip key={tag}>
                    <TooltipTrigger>
                      <ClosingBadge
                        onClick={()=> handleClose(tag)}
                      >
                        {tag}
                      </ClosingBadge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove {tag} filter</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
                <Badge
                  variant={"secondary"}
                  className="hover:bg-red-500 cursor-pointer py-0.5"
                  onClick={() => clearAllSearchParam("pkg")}
                >
                  clear filters
                </Badge>
                </motion.div>
            </div>
          </TooltipProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShowActiveFilter;
