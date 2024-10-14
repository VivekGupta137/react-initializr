import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TemplateForm from "./TemplateForm";
import { PlusIcon } from "lucide-react";
import SearchButton from "../search/SearchButton";
import SearchCommand from "../search/SearchCommand";
import SearchDialog from "../search/SearchDialog";

const AddTemplate = () => {
  return (
    <div className="flex gap-2">
      <div>
        <SearchDialog />
      </div>
      <Dialog>
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
            <DialogTitle>Add Template</DialogTitle>
            <DialogDescription>
              We just need a few details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <TemplateForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTemplate;
