import "server-only";
import prisma from "../../../../prisma";
import { getPkgFilters } from "@/lib/filterUtils";

const ViewFilteredTemplate = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  // getPkgFilters(searchParams);
    
    const filter = getPkgFilters(searchParams);
    console.log({filters: JSON.stringify(filter, null, 2)});
  const templates = await prisma.template.findMany({
    where: {
        ...filter
    //   AND: [
    //     {
    //         dependencies: {
    //             some: {
    //                 name: {
    //                     contains: "react",
    //                     mode: "insensitive"
    //                 }
    //             },
    //           },
    //     },
    //     {
    //         dependencies: {
    //             some: {
    //                 name: {
    //                     contains: "tailwindcss",
    //                     mode: "insensitive"
    //                 }
    //             },
    //           },
    //     }
    //   ],
    },
    include: {
      dependencies: true,
    },
  });

  return (
    <div>
      <h1>ViewFilteredTemplate</h1>
      <p>searchParams: {JSON.stringify(searchParams)}</p>
      {templates.map((template) => (
        <div key={template.id} className="border my-5">
          <h2>{template.name}</h2>
          <p>{template.description}</p>
          {/* <ul>
            {template.dependencies.map(({ name, version }) => {
              return (
                <li key={name}>
                  {name}={version}
                </li>
              );
            })}
          </ul> */}
          <p>{template.url}</p>
        </div>
      ))}
    </div>
  );
};


export default ViewFilteredTemplate;
