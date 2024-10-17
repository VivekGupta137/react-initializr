"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const keyboard = (
    <div>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-primary transition-all">
        <span className="text-xs">Ctrl</span>
        <span className="text-xs">J</span>
      </kbd>
    </div>
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        console.log("ctrl+j");
        console.log(inputRef.current);

        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <Input
        ref={inputRef}
        autoFocus={true}
        className="border"
        type="email"
        placeholder="Create quick filter"
        startIcon={<SearchIcon />}
        endIcon={keyboard}
      />
    </div>
  );
};

export default SearchInput;
