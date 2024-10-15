"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import TemplateForm from "./TemplateForm";
import { useState } from "react";

const TemplateDialog = () => {
    const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="group px-2">
            <div className="flex gap-2 ">
              <PlusIcon className="size-5 text-green-600" />
              <p className="text-muted-foreground group-hover:text-primary transition-all">
                Submit your template
              </p>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Template</DialogTitle>
            <DialogDescription>
              We just need a few details. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <TemplateForm dialogOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateDialog;
