import "server-only";

import { filters } from "@/constants/filters";
import FilterSection from "./filters/FilterSection";
import SearchInput from "./search/SearchInput";

const RadioFilters = async () => {
  return (
    <div className="flex flex-col gap-6 lg:pr-5">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-primary text-xl font-bold">Filters</h2>
        <SearchInput />
      </div>
      {filters.map(({ title, filters }) => (
        <div key={title}>
          <FilterSection title={title} filters={filters} />
        </div>
      ))}
    </div>
  );
};

export default RadioFilters;
