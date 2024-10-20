import "server-only";
import CopyButton from "../CopyButton";
import Link from "next/link";
import prisma from "../../../../prisma";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PiStarFill } from "react-icons/pi";
import { nFormatter } from "@/lib/filterUtils";
import { FaCodeFork } from "react-icons/fa6";
import { FaBinoculars } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { cn } from "@/lib/utils";

const TemplateItemMeta: React.FC<{
  metadata?: Awaited<ReturnType<typeof prisma.templateMetadata.findFirst>>;
}> = ({ metadata }) => {
  return (
    <div className="flex justify-center sm:justify-start flex-wrap gap-0.5">
      <div className="flex gap-1 items-center ml-3">
        <PiStarFill className=" fill-yellow-300" width={30} />
        <span className="text-sm text-muted-foreground">
          {nFormatter(metadata?.starsCount ?? 0, 1)}
        </span>
      </div>
      <div className="flex gap-1 items-center ml-3">
        <FaCodeFork className="text-gray-500" width={30} />
        <span className="text-sm text-muted-foreground">
          {nFormatter(metadata?.forksCount ?? 0, 1)}
        </span>
      </div>
      <div className="flex gap-1 items-center ml-3">
        <FaBinoculars className="text-gray-500" width={30} />
        <span className="text-sm text-muted-foreground">
          {nFormatter(metadata?.watchersCount ?? 0, 1)}
        </span>
      </div>

      {metadata?.license && (
        <div className="flex gap-1 ml-3 items-center">
          <GoDotFill
            className={cn(
              "text-secondary",
              metadata.license == "mit"
                ? "text-green-700"
                : metadata.license.includes("apache")
                ? "text-amber-700"
                : ""
            )}
          />
          <span className="text-sm text-muted-foreground">
            {metadata?.license.toLocaleUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default TemplateItemMeta;
