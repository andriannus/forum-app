import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  useAppSelector,
  selectCategory,
  setFilteredThreads,
  Thread,
} from "@/stores";

export function useFilterThreads() {
  const dispatch = useDispatch();

  const categories = useAppSelector((state) => state.threads.categories);
  const threads = useAppSelector((state) => state.threads.threads);
  const selectedCategory = useAppSelector(
    (state) => state.threads.selectedCategory,
  );
  const filteredThreads = useAppSelector(
    (state) => state.threads.filteredThreads,
  );

  const getChipActiveStatus = useCallback(
    (category: string) => {
      return category === selectedCategory;
    },
    [selectedCategory],
  );

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

  return {
    categories,
    filteredThreads,
    getChipActiveStatus,
    handleChipClick,
    selectedCategory,
  };
}
