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
