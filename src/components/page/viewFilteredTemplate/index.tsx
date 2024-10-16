import "server-only";
import prisma from "../../../../prisma";
import { getPkgFilters } from "@/lib/filterUtils";

import TemplateItem from "./TemplateItem";

import AddTemplate from "../addTemplate/AddTemplate";

const ViewFilteredTemplate = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const filter = getPkgFilters(searchParams);
  console.log({ filters: JSON.stringify(filter, null, 2) });
  const templates = await prisma.template.findMany({
    where: {
      ...filter,
    },
    include: {
      metadata: true,
    },
    take: 10,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-primary text-xl font-bold">Templates</h2>
        <AddTemplate />
      </div>

      <div className="flex flex-col w-full overflow-y-auto h-full">
        {templates.map(({ name, description, url, metadata }) => (
          <TemplateItem
            key={url}
            name={name}
            url={url}
            description={description}
            metadata={metadata}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewFilteredTemplate;
