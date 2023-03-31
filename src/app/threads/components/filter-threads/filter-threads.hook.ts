import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector, selectCategory, setFilteredThreads } from "@/stores";
import type { Thread } from "@/stores";

import type { UseFilterThreads } from "./filter-threads.model";

export function useFilterThreads(): UseFilterThreads {
  const { selectedCategory } = useAppSelector((state) => state.threads);

  const getChipActiveStatus = useCallback(
    (category: string) => {
      return category === selectedCategory;
    },
    [selectedCategory],
  );

  const dispatch = useDispatch();
  const { threads } = useAppSelector((state) => state.threads);

  const handleChipClick = useCallback(
    (category: string) => {
      if (category === selectedCategory) {
        dispatch(selectCategory(""));
        dispatch(setFilteredThreads(threads as Thread[]));

        return;
      }

      dispatch(selectCategory(category));

      const tempThreads = threads?.filter((thread) => {
        return thread.category === category;
      });

      dispatch(setFilteredThreads(tempThreads || []));
    },
    [dispatch, selectedCategory, threads],
  );

  const { categories } = useAppSelector((state) => state.threads);
  const { filteredThreads } = useAppSelector((state) => state.threads);

  return {
    categories,
    filteredThreads,
    getChipActiveStatus,
    handleChipClick,
    selectedCategory,
  };
}
