import type {
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import type { LoginRequest } from "@/models";

export interface UseLogin {
  formState: FormState<LoginRequest>;
  handleLoginFormSubmit: SubmitHandler<LoginRequest>;
  handleSubmit: UseFormHandleSubmit<LoginRequest>;
  isLoading: boolean;
  register: UseFormRegister<LoginRequest>;
  values: Partial<LoginRequest>;
}
