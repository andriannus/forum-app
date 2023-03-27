import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { RegisterForm } from "./register.model";

export function useRegister() {
  const { formState, handleSubmit, register, watch } = useForm<RegisterForm>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<RegisterForm>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleRegisterFormSubmit: SubmitHandler<RegisterForm> = useCallback(
    async (data) => {
      console.log(data);
    },
    [],
  );

  return {
    formState,
    handleRegisterFormSubmit,
    handleSubmit,
    register,
    values,
  };
}
