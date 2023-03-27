import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoginForm } from "./login.model";

export function useLogin() {
  const { formState, handleSubmit, register, watch } = useForm<LoginForm>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<LoginForm>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleLoginFormSubmit: SubmitHandler<LoginForm> = useCallback(
    async (data) => {
      console.log(data);
    },
    [],
  );

  return {
    formState,
    handleLoginFormSubmit,
    handleSubmit,
    register,
    values,
  };
}
