import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaClone } from "react-icons/fa6";

type TemplateItemProps = {
  name: string;
  description?: string | null;
  url: string;
};

const TemplateItem = ({ name, description, url }: TemplateItemProps) => {
  return (
    <div className="group ">
      <Card className="group-hover:bg-muted duration-200 flex">
        <div className="py-2 flex flex-col gap-2 px-3 grow shrink">
          <h2 className="font-bold text-lg">{name}</h2>
          <p>{description}</p>
        </div>
        <div className="rounded-md rounded-l-none pr-2 self-center shrink-0 basis-30">
          <Button>
            <FaClone className="mr-2 size-4" />
            Clone
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TemplateItem;
