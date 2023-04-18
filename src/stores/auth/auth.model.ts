import type { User } from "@/models";

export interface AuthState {
  token: string | null;
  user: User | null;
}
