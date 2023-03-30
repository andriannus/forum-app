import { ResponseWithData, User } from "@/models";

export interface AuthState {
  token: string | null;
  user: User | null;
}

export type ProfileResponse = ResponseWithData<{
  user: User;
}>;
