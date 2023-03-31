import type {
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import type { ThreadCreateRequest } from "@/stores";

export interface UseCreateThread {
  formState: FormState<ThreadCreateRequest>;
  handleCreateThreadFormSubmit: SubmitHandler<ThreadCreateRequest>;
  handleSubmit: UseFormHandleSubmit<ThreadCreateRequest>;
  isLoading: boolean;
  register: UseFormRegister<ThreadCreateRequest>;
  values: Partial<ThreadCreateRequest>;
}
