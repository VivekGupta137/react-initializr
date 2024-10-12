"use client"
import useUpdateSearchParam from "@/hooks/useUpdateSearchParam";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import TagFilter from "./filters/TagFilter";

const Filters = () => {


    return ( <div>
        filters
        <div>
            <TagFilter />
        </div>
    </div> );
}
 
export default Filters;