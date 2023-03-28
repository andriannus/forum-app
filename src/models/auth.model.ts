import { ResponseWithData } from "./api.model";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ResponseWithData<{ token: string }>;
