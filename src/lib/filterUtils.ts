import { Prisma } from "@prisma/client";


// This function removes all non-numeric characters from a string
export const cleanVersion = (version: string) => {
  return version.replace(/[^0-9.]/g, "");
};

export const getPkgFilters = (
  searchParams: Record<string, string | string[]>
) => {
  if (!searchParams.pkg) {
    return {};
  }
  if (Array.isArray(searchParams.pkg)) {
    const filters = searchParams.pkg.map((pkg) => {
      const { name, version } = extractPkgNameVersion(pkg);
      return makeDepFilter({ name, version });
    });
    return andFilter(filters);
  } else {
    const { name, version } = extractPkgNameVersion(searchParams.pkg);
    console.log({ name, version });

    const filter = makeDepFilter({ name, version });
    return filter;
  }
};

const andFilter = (filters: Prisma.TemplateWhereInput[]) => {
  return {
    AND: filters,
  };
};

const orFilter = (filters: Prisma.TemplateWhereInput[]) => {
  return {
    OR: filters,
  };
};

const makeDepFilter = ({
  name,
  version,
}: {
  name: string;
  version?: string;
}) => {
  const filter: Prisma.TemplateWhereInput = {
    dependencies: {
      some: {
        name: {
          contains: name,
          mode: "insensitive",
        },
        version: versionFilter(version),
      },
    },
  };
  return filter;
};

export const extractPkgNameVersion = (pkg: string) => {
  // only split on the last @
  const lastAtIndex = pkg.lastIndexOf("@");
  if (lastAtIndex === -1 || lastAtIndex === 0) {
    return { name: pkg };
  }
  const name = pkg.slice(0, lastAtIndex);
  const version = pkg.slice(lastAtIndex + 1);
  return { name, version };
};

export const versionFilter = (version?: string) => {
  if (!version) return undefined;

  return {
    startsWith: `(\\^${cleanVersion(version)})|(${cleanVersion(version)})`,
  } as Prisma.StringFilter<"Dependency">;
};