import type {
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import type { RegisterRequest } from "@/models";

export interface UseRegister {
  formState: FormState<RegisterRequest>;
  handleRegisterFormSubmit: SubmitHandler<RegisterRequest>;
  handleSubmit: UseFormHandleSubmit<RegisterRequest>;
  isLoading: boolean;
  registerField: UseFormRegister<RegisterRequest>;
  values: Partial<RegisterRequest>;
}
