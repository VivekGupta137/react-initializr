"use client";
import PackageFilter, { PackageListType } from "./filters/PackageFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filters } from "@/constants/filters";
import useMultiSearchParam from "@/hooks/useMultiSearchParam";

const Filters = () => {
    const accordionActiveFilter = (packageList: PackageListType[]) => {
        const {packages} = useMultiSearchParam();
        const packageItem = packageList.find((pack) => packages.map(({name})=>name).includes(pack.value))?.value ??
        "";
        const packageName = packageList.find((pack) => pack.value === packageItem)?.label ?? "";
        return packageName && <span>Selected: <span>{packageName}</span></span> || "";
    }
  return (
    <div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          {filters.map(({ title, filters }) => (
            <AccordionItem key={title} value={title}>
              <AccordionTrigger className="font-bold">
                <div className="flex flex-col items-start">
                  <div>{title}</div>
                  <div className="text-xs text-muted-foreground">{accordionActiveFilter(filters)}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <PackageFilter packageList={filters} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
