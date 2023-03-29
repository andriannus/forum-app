import { ResponseWithData, User } from "@/models";

export type ProfileResponse = ResponseWithData<{
  user: User;
}>;
