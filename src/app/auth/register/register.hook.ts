import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { HTTP_STATUS_CODES } from "@/constants";
import { useNotyf } from "@/context";
import { RegisterRequest } from "@/models";
import { useRegisterMutation } from "@/stores";

export function useRegister() {
  const navigate = useNavigate();
  const notyf = useNotyf();
  const [register, { error, isLoading }] = useRegisterMutation();

  const {
    formState,
    handleSubmit,
    register: registerField,
    watch,
  } = useForm<RegisterRequest>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<RegisterRequest>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleRegisterFormSubmit: SubmitHandler<RegisterRequest> = useCallback(
    async (data) => {
      try {
        await register(data).unwrap();
        navigate("/login");
      } catch {
        if (!error || !("data" in error)) {
          notyf.error("Ada sesuatu yang salah");
          return;
        }

        if (error.status === HTTP_STATUS_CODES.BAD_REQUEST) {
          notyf.error("Email telah digunakan");
        }
      }
    },
    [error, navigate, notyf, register],
  );

  return {
    formState,
    handleRegisterFormSubmit,
    handleSubmit,
    isLoading,
    registerField,
    values,
  };
}
