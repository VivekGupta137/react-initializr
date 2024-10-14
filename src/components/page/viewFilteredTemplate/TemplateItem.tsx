import { Card } from "@/components/ui/card";
import CopyButton from "../CopyButton";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FaGithub } from "react-icons/fa";

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
          <div className="flex gap-2">
            <Link href={url} target="_blank">
              <GitHubLogoIcon /> 
            </Link>
          </div>
        </div>
        <div className="rounded-md rounded-l-none pr-2 self-center shrink-0 basis-30">
          <CopyButton variant={"outline"} copyText="test">
            Clone
          </CopyButton>
        </div>
      </Card>
    </div>
  );
};

export default TemplateItem;
