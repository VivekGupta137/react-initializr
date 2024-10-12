import { useSearchParams, useRouter } from "next/navigation";

const useUpdateSearchParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") params.delete(key);
    else params.set(key, value);
    router.push(`?${params.toString()}`);
  };
  return { updateSearchParam, params:searchParams };
};

export default useUpdateSearchParam;
