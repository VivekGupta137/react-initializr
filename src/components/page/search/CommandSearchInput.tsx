"use client";

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Command as CMDK } from "cmdk";
import { NPMResult, searchNPM } from "@/actions/action";
import { Spinner } from "@nextui-org/spinner";
import { ExternalLink, PlusIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";
import { nFormatter } from "@/lib/filterUtils";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const CommandSearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addSearchParam } = useMultiSearchParam();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<NPMResult | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setResults(null);
      const response = await searchNPM(debouncedInputValue, 0);
      setResults(response);
      setIsLoading(false);
    };

    if (debouncedInputValue.length > 0) {
      fetchResults();
    } else {
      setResults(null);
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const keyboard = (
    <div>
      <div className="px-2">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-primary transition-all">
          <span className="text-xs">Ctrl</span>
          <span className="text-xs">J</span>
        </kbd>
      </div>
    </div>
  );

const getPkgLink = (value: string) => {
    const fields = searchParams.getAll('pkg');
    fields.push(value);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('pkg');
    fields.forEach((field) => params.append('pkg', field));
    return `?${params.toString()}`
}

  const endIcon =
    inputValue.length > 0 ? (
      <Button
        size={"icon"}
        variant="destructive"
        onClick={() => setInputValue("")}
        className="text-muted-foreground rounded-full size-4 mr-2"
      >
        <X className="size-4" />
      </Button>
    ) : (
      keyboard
    );

  return (
    <div className="w-full sm:max-w-[222px] h-30 group flex relative">
      <Command shouldFilter={false} className="border">
        <CommandInput
          ref={inputRef}
          placeholder="Create quick filter..."
          value={inputValue}
          onValueChange={setInputValue}
          loading={isLoading}
          className="h-9"
          autoFocus
          endIcon={endIcon}
        />
        <CommandList
            className={cn(
              "absolute top-[110%] left-0 w-full z-20 bg-[hsl(var(--background))] border rounded-md",
              inputValue.length == 0 || !results ? "hidden" : ""
            )}
          >
            {inputValue.length > 0 && results && (
              <CommandGroup
                heading={
                  <div className="flex items-center justify-between">
                    <span>Suggestions</span>
                    <span>{nFormatter(results.total, 1)} results found</span>
                  </div>
                }
              >
                {results.results.map((result) => (
                  <Link key={result.package.name} href={getPkgLink(result.package.name)}>
                    <CommandItem
                      key={result.package.name}
                      className="break-all w-full"
                      onSelect={(value) => {
                        setInputValue("");
                        addSearchParam("pkg", value);
                      }}
                    >
                      <span className="break-all">{result.package.name}</span>
                      <CommandShortcut>
                        <ExternalLink className="size-5" />
                      </CommandShortcut>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            )}
          </CommandList>
      </Command>
    </div>
  );
};

export default CommandSearchInput;
