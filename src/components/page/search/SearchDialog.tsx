"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import SearchButton from "./SearchButton";
import SearchCommand from "./SearchCommand";

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
