import "server-only";
import prisma from "../../../../prisma";
import { getPkgFilters, getSortedBy } from "@/lib/filterUtils";

import TemplateItem from "./TemplateItem";

import { unstable_cache as cache } from "next/cache";
import MyPagination from "./pagination";
import SortTemplates from "./sortTemplates";
import CloneForkButton from "./CloneForkButton";

const ViewFilteredTemplate = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const take = Math.min(parseInt(searchParams.take) || 10, 25);
  const skip = parseInt(searchParams.skip) || 0;

  const { sortValue } = getSortedBy(searchParams);

  const getTemplates = cache(
    async (params) => {
      const filter = getPkgFilters(searchParams);
      const query = {
        where: {
          ...filter,
        },
        include: {
          metadata: true,
        },
        take,
        skip,
        orderBy: [
          {
            metadata: {
              [sortValue]: "desc",
            },
          },
        ],
      };
      // await new Promise((resolve) => setTimeout(resolve, 3000)); // avoid abuse
      const [templates, count] = await prisma.$transaction([
        prisma.template.findMany(query),
        prisma.template.count({
          where: query.where,
        }),
      ]);
      return { templates, count };
    },
    ["templates-filtered"],
    { revalidate: 3600 }
  );

  const { templates, count } = await getTemplates(searchParams);

  return (
    <div className="flex flex-col w-full overflow-y-auto h-full">
      {count > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between  pr-2">
          <div className="text-sm text-muted-foreground self-end pl-3">
              {count} found (viewing {skip + 1} to{" "}
              {Math.min(skip + take, count)})
            </div>
              <div className="flex gap-2">
              <CloneForkButton />
              <SortTemplates searchParams={searchParams} />
              </div>
          </div>
        </div>
      )}
      {templates.map(({ name, description, url, metadata }) => (
        <TemplateItem
          key={url}
          name={name}
          url={url}
          description={description}
          metadata={metadata}
          searchParams={searchParams}
        />
      ))}
      {templates.length === 0 && <div>No templates found</div>}
      <div className="mt-2 ml-auto">
        <MyPagination {...{ take, skip, count, searchParams }} />
      </div>
    </div>
  );
};

export default ViewFilteredTemplate;
