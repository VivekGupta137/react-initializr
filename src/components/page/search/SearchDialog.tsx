"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PlusIcon, Search } from "lucide-react";
import useUpdateSearchParam from "@/hooks/useUpdateSearchParam";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & { value: string };
}

const SearchDialog = ({ open, setOpen }: SearchDialogProps) => {
  const { addSearchParam } = useMultiSearchParam();

  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = (e: HandleSubmitEvent) => {
    e.preventDefault();

    addSearchParam("dep", searchValue);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="flex items-center px-2 gap-2">
            <Search className="size-5" />
            <form onSubmit={handleSubmit} className="w-full ">
              <Input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="search packages"
                className="border-0 ring-0 focus:ring-0 focus:ring-offset-0"
              />
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
