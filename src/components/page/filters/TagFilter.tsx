"use client";

import { Button } from "@/components/ui/button";
import useUpdateSearchParam from "@/hooks/useUpdateSearchParam";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import SearchDialog from "../search/SearchDialog";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";

const TagFilter = () => {
  const { removeSearchParam, params } = useMultiSearchParam();
  const [openDialog, setOpenDialog] = useState(false);
  const depTags = params.getAll("dep");
  return (
    <div>
      <div>tag filters</div>
      <div className="flex gap-2">
        {depTags.map((tag) => (
          <Button
            key={tag}
            variant={"default"}
            onClick={() => removeSearchParam("dep", tag)}
          >
            {tag}
          </Button>
        ))}
        <Button variant={"outline"} onClick={()=>{
            setOpenDialog(true)
        }}>
          <PlusIcon />
        </Button>
      </div>
      <div>
        <SearchDialog open={openDialog} setOpen={setOpenDialog}/>
      </div>
    </div>
  );
};

export default TagFilter;
