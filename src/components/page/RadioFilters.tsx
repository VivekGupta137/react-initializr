"use client"

import { filters } from "@/constants/filters";
import FilterSection from "./filters/FilterSection";
import SearchInput from "./search/SearchInput";
import ShowActiveFilter from "./viewFilteredTemplate/ShowActiveFilter";
import { LayoutGroup, motion } from "framer-motion";

const RadioFilters = async () => {
  return (
    <div className="flex flex-col gap-6 lg:pr-5">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-primary text-xl font-bold">Filters</h2>
        <SearchInput />
      </div>
      <LayoutGroup>
        <motion.div layoutId="123">
          <ShowActiveFilter />
        </motion.div>
        {filters.map(({ title, filters }) => (
          <motion.div key={title} layoutId={title}>
            <FilterSection title={title} filters={filters} />
          </motion.div>
        ))}
        </LayoutGroup>
    </div>
  );
};

export default RadioFilters;
