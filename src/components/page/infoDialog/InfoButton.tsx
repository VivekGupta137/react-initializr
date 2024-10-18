"use client"
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const InfoButton = () => {
    return ( 
        <Popover>
            <PopoverTrigger asChild>
    <Button className="p-0 h-5 text-muted-foreground" variant={"ghost"}>
        <QuestionMarkCircledIcon className="size-5" />
    </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80 bg-[hsl(var(--background))]">
        <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold text-primary">Quick Filters</div>
            <div className="text-sm text-muted-foreground">Quick filters can be added by typing in the search bar.</div>
            <div className="text-sm text-muted-foreground font-semibold">
                Examples:
            </div>
            <div className="text-sm text-muted-foreground">
                <ul>
                    <li>1. <span className="text-primary">react</span> : adds filter for react package</li>
                    <li>2. <span className="text-primary">react@18</span> : adds filter for react package with version 18</li>
                    <li>
                        3. <span className="text-primary">react next tailwindcss</span> : adds filter for react, next and tailwindcss packages
                    </li>
                </ul>
            </div>
        </div>
    </PopoverContent>
    </Popover> );
}
 
export default InfoButton;