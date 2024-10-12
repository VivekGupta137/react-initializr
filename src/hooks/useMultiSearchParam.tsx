import { useRouter, useSearchParams } from "next/navigation";

const useMultiSearchParam = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const addSearchParam = (key: string, value: string) => {
        const fields = searchParams.getAll(key);
        if (fields.includes(value)) return;
        fields.push(value);
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        fields.forEach((field) => params.append(key, field));
        router.push(`?${params.toString()}`);
    }

    const removeSearchParam = (key: string, value: string) => {
        const fields = searchParams.getAll(key);
        if (!fields.includes(value)) return;
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        fields.filter((field) => field !== value).forEach((field) => params.append(key, field));
        router.push(`?${params.toString()}`);
    }
    return ( {addSearchParam, removeSearchParam, params: searchParams} );
}
 
export default useMultiSearchParam;