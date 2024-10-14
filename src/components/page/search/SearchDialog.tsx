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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PlusIcon, Search } from "lucide-react";
import useUpdateSearchParam from "@/hooks/useUpdateSearchParam";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";
import SearchButton from "./SearchButton";
import SearchCommand from "./SearchCommand";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & { value: string };
}

const SearchDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SearchButton handleOpen={setOpen} />
        </DialogTrigger>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Filter Templates</DialogTitle>
          </DialogHeader>
          <SearchCommand />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
