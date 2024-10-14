"use client";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


export interface PackageListType {
    value: string;
    label: string;
    icon: JSX.Element;
}


const PackageFilter = ({packageList}: {packageList: PackageListType[]}) => {
  const {
    updateSearchParam,
    packages,
  } = useMultiSearchParam();
  
  const packageItem =
    packageList.find((pack) => packages.map(({name})=> name).includes(pack.value))?.value ??
    "";
  const handleToggle = (value: string) => {
    updateSearchParam("pkg", value, packageItem);
  };

  return (
    <ToggleGroup
      type="single"
      value={packageItem}
      onValueChange={handleToggle}
      className="flex flex-wrap gap-2 justify-start"
    >
      {packageList.map(({ value, label, icon }) => {
        return (
          <ToggleGroupItem
            key={value}
            variant={"outline"}
            value={value}
            aria-label={label}
            className="flex gap-2"
          >
            {icon}
            {label}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};

export default PackageFilter;
