import "server-only";
import prisma from "../../../../prisma";
import { getPkgFilters } from "@/lib/filterUtils";

import TemplateItem from "./TemplateItem";

import AddTemplate from "../addTemplate/AddTemplate";
import { Suspense } from "react";
import ViewFilterLoader from "./ViewFilterLoader";
import { unstable_cache as cache } from 'next/cache';

const ViewFilteredTemplate = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  

  const getTemplates = cache(async (params) => {
    const filter = getPkgFilters(searchParams);
    
    const templates = await prisma.template.findMany({
      where: {
        ...filter,
      },
      include: {
        metadata: true,
      },
      take: 10,
    });
    return templates;
  }, ['templates-filtered'], {revalidate: 3600})

  const templates = await getTemplates(searchParams);

  return (
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
      {templates.length === 0 && <div>No templates found</div>}
    </div>
  );
};

const ViewFilteredTemplateWithLoading = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-primary text-xl font-bold">Templates</h2>
        <AddTemplate />
      </div>
      <Suspense key={JSON.stringify(searchParams)} fallback={<ViewFilterLoader />}>
        <ViewFilteredTemplate searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ViewFilteredTemplateWithLoading;
