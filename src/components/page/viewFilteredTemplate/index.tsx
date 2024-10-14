import "server-only";
import prisma from "../../../../prisma";
import { getPkgFilters } from "@/lib/filterUtils";
import ShowActiveFilter from "./ShowActiveFilter";
import SearchButton from "../search/SearchButton";
import TemplateItem from "./TemplateItem";

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
  });
  

  return (
    <div>
      <div className="flex flex-col border-b py-3 mb-5">
        <h1 className="text-lg font-bold">Templates: </h1>
        <ShowActiveFilter />
      </div>

      <div className="flex flex-col gap-2 w-full">
        {templates.map(({ name, description, url }) => (
          <TemplateItem key={url} name={name} description={description} url={url} />
        ))}
      </div>
    </div>
  );
};

export default ViewFilteredTemplate;
