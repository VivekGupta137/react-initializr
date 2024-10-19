import { extractPkgNameVersion } from "@/lib/filterUtils";
import { useRouter, useSearchParams } from "next/navigation";

const useMultiSearchParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const packages = searchParams.getAll("pkg").map((pkg) => {
    return extractPkgNameVersion(pkg);
  });

  const addSearchParam = (key: string, value: string) => {
    const fields = searchParams.getAll(key);
    if (fields.includes(value)) return;
    fields.push(value);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    fields.forEach((field) => params.append(key, field));
    router.push(`?${params.toString()}`);
  };

  const removeSearchParam = (key: string, value: string) => {
    const fields = searchParams.getAll(key);
    if (!fields.includes(value)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    fields
      .filter((field) => field !== value)
      .forEach((field) => params.append(key, field));
    router.push(`?${params.toString()}`);
  };

  const updateSearchParam = (key: string, value: string, prev: string) => {
    const fields = searchParams.getAll(key);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const valueArray = value.split(/\s+/).filter((v) => v.length > 0);
    const prevArray = prev.split(/\s+/).filter((v) => v.length > 0);
    fields
      .filter(
        (field) =>
          !valueArray.includes(extractPkgNameVersion(field).name) &&
          !prevArray.includes(extractPkgNameVersion(field).name)
      )
      .forEach((field) => params.append(key, field));
    if (valueArray.length > 0) {
      valueArray.forEach((val) => {
        params.append(key, val);
      })
    }
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const clearAllSearchParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`?${params.toString()}`);
  }

  return {
    addSearchParam,
    removeSearchParam,
    updateSearchParam,
    clearAllSearchParam,
    params: searchParams,
    packages,
  };
};

export default useMultiSearchParam;
