import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FilterIcon, SearchIcon } from "lucide-react";
import { RiFilterFill } from "react-icons/ri";

const SearchButton = ({handleOpen} : {handleOpen:any}) => {
  return (
    <Button variant="outline" className="px-2 group bg-muted/50" onClick={()=>handleOpen(true)}>
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
  );
};

export default SearchButton;
