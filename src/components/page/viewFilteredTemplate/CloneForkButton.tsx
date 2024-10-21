"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

const CloneForkButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const action = searchParams.get("action") || "clone";
  const [isPending, startTransition] = useTransition();

  const handleChange = async (selectedAction: string) => {
    router.push(getLink(selectedAction));
  };

  const getLink = (action: string) => {
    const search = new URLSearchParams(searchParams.toString());
    search.set("action", action);
    return `?${search.toString()}`;
  };
  return (
    <div>
      <Select value={action} onValueChange={(value)=>startTransition(()=> handleChange(value as string))}>
        <SelectTrigger loading={isPending} valueType="caret" className="w-full">
          <SelectValue placeholder="Select action" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Action</SelectLabel>
            <Link href={getLink("clone")}>
              <SelectItem value="clone">Clone</SelectItem>
            </Link>
            <SelectItem value="fork">Fork</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CloneForkButton;
