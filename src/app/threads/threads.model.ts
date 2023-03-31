import type { Thread } from "@/stores";

export interface UseThreads {
  filteredThreads: Thread[] | null;
  getOwnerName: (ownerID: string) => string | undefined;
  isThreadsLoading: boolean;
  isUsersLoading: boolean;
}
