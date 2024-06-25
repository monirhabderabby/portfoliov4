"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { filterOptions } from "./all-project";

interface TabFilterProps {
  filterOptions: filterOptions[];
  defaultFilterActive: string;
  setValue: (value: string) => void;
}

const TabFilter: React.FC<TabFilterProps> = ({
  filterOptions,
  defaultFilterActive,
  setValue,
}) => {
  const [current, setCurrent] = useState(defaultFilterActive);

  const tabChange = (FilterValue: string) => {
    setCurrent(FilterValue);

    // this value will goes from where is randered
    setValue(FilterValue);
  };
  return (
    <div className="container flex flex-wrap gap-[20px]">
      {filterOptions?.map(({ id, label, value }) => {
        return (
          <label
            key={id}
            className={cn(
              current !== value && "hover:bg-accent/15 text-white/50",
              current == value ? "bg-accent/40 text-white" : "bg-accent/10",
              "border-[1px] border-white/20 px-[15px]  text-[14px] md:px-[20px] md:py-[5px] rounded-[50px] cursor-pointer"
            )}
            onClick={() => tabChange(value)}
          >
            {label}
          </label>
        );
      })}
    </div>
  );
};

export default TabFilter;
