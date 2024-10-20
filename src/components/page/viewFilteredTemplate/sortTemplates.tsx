"use client";

import { sortedBy, sortMap } from "@/constants/sortedBy";
import { getSortedBy } from "@/lib/filterUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortTemplates: React.FC<{ searchParams: Record<string, string> }> = ({
  searchParams,
}) => {
  const { sortKey: searchKey } = getSortedBy(searchParams);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

  return (
    <Select value={searchKey} onValueChange={(value)=>{
        startTransition(()=> {
            const params = new URLSearchParams({
                ...searchParams,
                sortBy: value
            });
            router.push(`?${params.toString()}`)
        })
    }}>
      <SelectTrigger loading={isPending} className="w-[full]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {sortedBy.map(({ label, searchParam, value }) => (
            <SelectItem key={searchParam} value={searchParam}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
        
  );
};

export default SortTemplates;
