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
  const [items, setItems] = useState<NPMResult["results"] | []>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const infLoader = useRef<HTMLDivElement | null>(null);
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
      if (response !== null) setItems(response.results);
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleLoadMore();
      }
    });
    if (infLoader.current) {
      observer.observe(infLoader.current);
    }

    return () => observer.disconnect();
  }, [infLoader, items]);

  const handleLoadMore = async () => {
    // setIsLoading(true);
    const response = await searchNPM(debouncedInputValue, items.length);
    if (response.results) {
      if (response.results) {
        setItems((prevItems: NPMResult["results"]) => [
          ...prevItems,
          ...response.results,
        ]);
      }
    }
    // setIsLoading(false);
  };

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
    const fields = searchParams.getAll("pkg");
    fields.push(value);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("pkg");
    fields.forEach((field) => params.append("pkg", field));
    return `?${params.toString()}`;
  };

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
        <div className={cn("absolute top-[110%] left-0 w-full z-20 bg-[hsl(var(--background))] border rounded-md", inputValue.length == 0 || !results ? "hidden" : "")}>
          <CommandList
            className={cn(
              
            )}
          >
            {inputValue.length > 0 && results && (
              <CommandGroup
                heading={
                  <div className="flex items-center justify-between">
                    <span>Suggested packages</span>
                  </div>
                }
              >
                {items.map((result) => (
                  <Link
                    key={result.package.name}
                    href={getPkgLink(result.package.name)}
                  >
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
                {results.total > items.length && (
                  <CommandItem ref={infLoader} className="flex justify-center">
                    <Spinner size="md" />
                  </CommandItem>
                )}
              </CommandGroup>
            )}
          </CommandList>
            <p className="text-xs py-0.5 text-end pr-1 border-t text-muted-foreground">
            {nFormatter(results?.total ?? 0, 1)} results found <span className="inline-block"> (viewing 1 to {items.length})</span>
            </p>
        </div>
      </Command>
    </div>
  );
};

export default CommandSearchInput;
