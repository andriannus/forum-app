import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNotyf } from "@/context";

import {
  selectCategory,
  setCategories,
  setFilteredThreads,
  setThreads,
  useAppSelector,
  useGetThreadsMutation,
  useGetUsersQuery,
} from "@/stores";

export function useThreads() {
  const notyf = useNotyf();
  const dispatch = useDispatch();
  const [getThreads, { isLoading: isThreadsLoading }] = useGetThreadsMutation();

  const handleMounted = useCallback(async () => {
    try {
      const threads = await getThreads().unwrap();
      const categories = new Set<string>();

      threads.forEach((thread) => {
        categories.add(thread.category);
      });

      dispatch(selectCategory(""));
      dispatch(setCategories(Array.from(categories)));
      dispatch(setThreads(threads));
      dispatch(setFilteredThreads(threads));
    } catch {
      notyf.error("Ada sesuatu yang salah");
    }
  }, [dispatch, getThreads, notyf]);

  useEffect(() => {
    handleMounted();
  }, [handleMounted]);

  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const getOwnerName = useCallback(
    (ownerID: string) => {
      if (!users) return "-";

      const owner = users.find((user) => user.id === ownerID);
      return owner?.name;
    },
    [users],
  );

  const { filteredThreads } = useAppSelector((state) => state.threads);

  return { filteredThreads, getOwnerName, isThreadsLoading, isUsersLoading };
}
