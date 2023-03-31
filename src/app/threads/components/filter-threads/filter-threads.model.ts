import type { Thread } from "@/stores";

export interface FilterThreadsProps {
  category: string;
}

export interface UseFilterThreads {
  categories: string[] | null;
  filteredThreads: Thread[] | null;
  getChipActiveStatus: (category: string) => boolean;
  handleChipClick: (category: string) => void;
  selectedCategory: string | null;
}
