import type { User } from "@/models";

export interface UseProfile {
  logout: () => void;
  profile: User | null;
}
