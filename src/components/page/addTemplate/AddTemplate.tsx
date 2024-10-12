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

const AddTemplate = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add your template</Button>
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
