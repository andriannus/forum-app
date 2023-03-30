import { FC } from "react";

import { Chip } from "@/components";

import { useFilterThreads } from "./filter-threads.hook";

import "./filter-threads.component.scss";

const FilterThreads: FC = () => {
  const { categories, getChipActiveStatus, handleChipClick } =
    useFilterThreads();

  if (!categories) return null;

  return (
    <div className="FilterThreads">
      {categories.map((category, key) => {
        return (
          <Chip
            key={key}
            active={getChipActiveStatus(category)}
            button
            small
            onClick={() => handleChipClick(category)}
          >
            #{category}
          </Chip>
        );
      })}
    </div>
  );
};

export default FilterThreads;
