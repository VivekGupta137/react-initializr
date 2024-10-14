import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TemplateForm from "./TemplateForm";
import { PlusIcon } from "lucide-react";
import SearchDialog from "../search/SearchDialog";
import TemplateDialog from "./TemplateDialog";

const AddTemplate = () => {
  return (
    <div className="flex gap-2">
      <div>
        <SearchDialog />
      </div>
      <TemplateDialog />
    </div>
  );
};

export default AddTemplate;
