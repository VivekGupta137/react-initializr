import { filters } from "@/constants/filters";
import { Radio, RadioGroup } from "@nextui-org/react";
import "server-only";
import { Button } from "../ui/button";
import SearchDialog from "./search/SearchDialog";

const RadioFilters = async () => {
  return (
    <div className="flex flex-col gap-6 pr-5">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-primary text-xl font-bold">Filters</h2>
        <SearchDialog />
      </div>
      {filters.map(({ title, filters }) => (
        <div key={title}>
          <RadioGroup
            label={title}
            classNames={{
              label: "text-primary font-bold",
              wrapper: "flex gap-2 gap-4",
            }}
            orientation="horizontal"
          >
            {filters.map(({ label, value, icon }) => (
              <Radio
                key={value}
                value={value}
                classNames={{
                  labelWrapper: "flex flex-row gap-1",
                  wrapper: "group-data-[selected=true]:border-[#58C4DC]",
                  control: "bg-[#58C4DC]",
                  description: "group-data-[selected=true]:text-primary",
                }}
                description={label}
              >
                {icon}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default RadioFilters;
