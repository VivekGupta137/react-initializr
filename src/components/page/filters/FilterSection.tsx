"use client";

import useMultiSearchParam from "@/hooks/useMultiSearchParam";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Spinner } from "@nextui-org/spinner";
import { useOptimistic, useTransition } from "react";
import { FiLoader } from "react-icons/fi";

export interface FilterType {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface FilterSectionProps {
  title: string;
  filters: FilterType[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, filters }) => {
  const { updateSearchParam, packages } = useMultiSearchParam();
  const [isPending, startTransition] = useTransition();
  const packageItem =
    filters.find((pack) =>
      packages.map(({ name }) => name).includes(pack.value)
    )?.value ?? "";

  const [optimisticState, addOptimistic] = useOptimistic<string, string>(
    packageItem,
    (current, optimisticValue) => {
      return optimisticValue;
    }
  );

  const handleToggle = (value: string) => {
    addOptimistic(value);
    updateSearchParam("pkg", value, packageItem);
  };

  return (
    <RadioGroup
      label={
        <div className="flex gap-2">
          {title}{" "}
          {isPending ? (
            <Spinner size="sm" color="primary"/>
          ) : (
            ""
          )}
        </div>
      }
      
      classNames={{
        label: "text-primary font-bold",
        wrapper: "flex gap-2 gap-4",
      }}
      value={optimisticState}
      onValueChange={(value) => startTransition(() => handleToggle(value))}
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
  );
};

export default FilterSection;
