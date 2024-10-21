import "server-only";
import CopyButton from "../CopyButton";
import Link from "next/link";
import prisma from "../../../../prisma";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaCodeFork } from "react-icons/fa6";
import TemplateItemMeta from "./TemplateItemMeta";
import { Button } from "@/components/ui/button";
type TemplateItemProps = {
  name: string;
  description?: string | null;
  url: string;
  metadata?: Awaited<ReturnType<typeof prisma.templateMetadata.findFirst>>;
  searchParams: Record<string, string>;
};

const TemplateItem = ({
  name,
  description,
  url,
  metadata,
  searchParams,
}: TemplateItemProps) => {
  const action = searchParams['action'] || 'clone'

  return (
    <div className="group sm:border-b hover:bg-muted duration-200 mt-2">
      <div className="flex flex-col sm:flex-row ">
        <div className="py-2 flex flex-col gap-2 px-3 grow shrink">
          <div className="flex gap-2 items-center">
            <div className="rounded-sm overflow-hidden">
              <Image
                src={metadata?.orgAvatarUrl ?? ""}
                alt={metadata?.orgName ?? ""}
                width={20}
                height={20}
              />
            </div>
            <h2 className="font-bold text-lg text-blue-500 hover:underline">
              <Link href={metadata?.htmlUrl ?? "#"} target="_blank">
                {name}
              </Link>
            </h2>
            <div>
              <Link href={metadata?.htmlUrl ?? "#"} target="_blank">
                <ExternalLink className="size-5" />
              </Link>
            </div>
          </div>
          <p className="text-muted-foreground">{description}</p>
          <div className="block sm:hidden">
            <TemplateItemMeta metadata={metadata} />
          </div>
        </div>
        <div className="rounded-md rounded-l-none sm:pr-2 sm:self-start sm:pt-2 shrink-0 basis-30 order">
          {action=='clone' && <CopyButton
            variant={"outline"}
            copyText={`git clone ${metadata?.cloneUrl ?? ""}`}
            className="w-full"
          >
            Clone
          </CopyButton>}
          {action=='fork' && <Link
            href={`${metadata?.htmlUrl ?? "#"}/fork`}
            target="_blank"
          >
            <Button variant={"outline"} className="w-full">
            <FaCodeFork className="mr-2" />
              Fork</Button>
          </Link>}
        </div>
      </div>
      <div className="hidden sm:block mb-2">
        <TemplateItemMeta metadata={metadata} />
      </div>
    </div>
  );
};

export default TemplateItem;
