import { ResponseWithData } from "@/models";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type UserResponse = ResponseWithData<{ users: User[] }>;
