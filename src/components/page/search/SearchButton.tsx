import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FilterIcon, SearchIcon } from "lucide-react";
import { RiFilterFill } from "react-icons/ri";

const SearchButton = () => {
  return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="px-2 group bg-muted/50">
              <div className="flex gap-2 items-center">
                <FilterIcon className="size-4 text-muted-foreground" />
                <div className="min-w-40 text-start text-muted-foreground group-hover:text-primary transition-all">
                  Create advanced filter
                </div>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-primary transition-all">
                  <span className="text-xs">Ctrl</span>
                  <span className="text-xs">J</span>
                </kbd>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-primary transition-all">
                  <span className="text-xs">⌘</span>
                  <span className="text-xs">J</span>
                </kbd>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Opens advanced filter command pallete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  );
};

export default SearchButton;
