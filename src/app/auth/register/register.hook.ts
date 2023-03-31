import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { HTTP_STATUS_CODES } from "@/constants";
import { useNotyf } from "@/context";
import type { RegisterRequest } from "@/models";
import { useRegisterMutation } from "@/stores";

import type { UseRegister } from "./register.model";

export function useRegister(): UseRegister {
  const [register, { isLoading }] = useRegisterMutation();

  const {
    formState,
    handleSubmit,
    register: registerField,
    watch,
  } = useForm<RegisterRequest>({
    mode: "onChange",
  });

  const [values, setValues] = useState<Partial<RegisterRequest>>({});

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const navigate = useNavigate();
  const notyf = useNotyf();

  const handleRegisterFormSubmit: SubmitHandler<RegisterRequest> = useCallback(
    async (data) => {
      try {
        await register(data).unwrap();
        navigate("/login");
      } catch (error) {
        const { status } = error as FetchBaseQueryError;

        if (status === HTTP_STATUS_CODES.BAD_REQUEST) {
          notyf.error("Email telah digunakan");
          return;
        }

        notyf.error("Ada sesuatu yang salah");
      }
    },
    [navigate, notyf, register],
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
