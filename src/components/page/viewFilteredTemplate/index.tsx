import "server-only";
import prisma from "../../../../prisma";
import { getPkgFilters } from "@/lib/filterUtils";

import TemplateItem from "./TemplateItem";

import AddTemplate from "../addTemplate/AddTemplate";
import { Suspense } from "react";
import ViewFilterLoader from "./ViewFilterLoader";
import { unstable_cache as cache } from 'next/cache';
import { Prisma } from "@prisma/client";
import MyPagination from "./pagination";

const ViewFilteredTemplate = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {

  const take = Math.min(parseInt(searchParams.take) || 10, 25);
  const skip = parseInt(searchParams.skip) || 0;

  const getTemplates = cache(async (params) => {
    const filter = getPkgFilters(searchParams);
    const query = {
      where : {
        ...filter,
      },
      include: {
        metadata: true,
      },
      take,
      skip,
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000)); // avoid abuse
    const [templates, count] = await prisma.$transaction([
      prisma.template.findMany({
        ...query
      }),
      prisma.template.count({
        where: query.where
      })
    ])
    // const templates = await prisma.template.findMany({
    //   ...query
    // });
    return {templates, count};
  }, ['templates-filtered'], {revalidate: 3600})

  const {templates, count} = await getTemplates(searchParams);

  return (
    <div className="flex flex-col w-full overflow-y-auto h-full">
      {count > 0 && <div className="flex justify-between">
      <div className="text-sm text-muted-foreground">
        {count} found (viewing {skip + 1} to {Math.min(skip + take, count)})
      </div>
      <MyPagination {...{take, skip, count, searchParams}} />
      </div>}
      {templates.map(({ name, description, url, metadata }) => (
        <TemplateItem
          key={url}
          name={name}
          url={url}
          description={description}
          metadata={metadata}
        />
      ))}
      {templates.length === 0 && <div>No templates found</div>}
    </div>
  );
};

export default ViewFilteredTemplate;
