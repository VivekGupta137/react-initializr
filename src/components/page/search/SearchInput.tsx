"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";
import { ArrowRight, ArrowRightIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import InfoButton from "../infoDialog/InfoButton";
import { toast } from "sonner";
import z from "zod";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { updateSearchParam } = useMultiSearchParam();
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
  const [value, setValue] = useState<string>("");
  const [isPending, startTransition] = useTransition()
  
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

  const formSchema = z.object({
    pkg: z.string().refine((val) => val.length > 0, {
      message: "Package name cannot be empty.",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formSchema.parse({ pkg: value });

      updateSearchParam("pkg", value, "")

      toast.success("Filter added successfully.", {
        action: {
          label: "Undo",
          onClick: () => {
            updateSearchParam("pkg", "", value);
          },
        },
      });

      setValue("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error("Failed to add filter", {
          description: err.errors[0].message,
        });
      } else {
        toast.error("Failed to add filter");
      }
    }
  };

  return (
    <div className="flex gap-2 items-center w-full">
      <form className="flex grow" onSubmit={(e)=> startTransition(()=>handleSubmit(e))}>
        <Input
          ref={inputRef}
          autoFocus={true}
          className="border rounded-r-none"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Create quick filter"
          startIcon={<SearchIcon />}
          endIcon={keyboard}
          name="pkg"
        />
        <Button
          variant={"outline"}
          className="p-0 text-primary rounded-l-none min-w-10"
          aria-label="submit"
          disabled={isPending}
          loading={isPending}
        >
          <ArrowRight className="size-4 text-primary" />
        </Button>
      </form>
      <InfoButton />
    </div>
  );
};

export default SearchInput;
