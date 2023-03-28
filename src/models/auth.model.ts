import { ResponseWithData } from "./api.model";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ResponseWithData<{ token: string }>;

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterUser {
  avatar: string;
  email: string;
  id: string;
  name: string;
}

export type RegisterResponse = ResponseWithData<{
  user: RegisterUser;
}>;
