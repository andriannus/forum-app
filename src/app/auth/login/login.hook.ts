import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { HTTP_STATUS_CODES } from "@/constants";
import { useNotyf } from "@/context";
import type { LoginRequest } from "@/models";
import {
  useLoginMutation,
  useGetProfileMutation,
  setCredentials,
  setProfile,
} from "@/stores";

import type { UseLogin } from "./login.model";

export function useLogin(): UseLogin {
  const { formState, handleSubmit, register, watch } = useForm<LoginRequest>({
    mode: "onChange",
  });

  const [values, setValues] = useState<Partial<LoginRequest>>({});

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const notyf = useNotyf();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [getProfile] = useGetProfileMutation();

  const handleLoginFormSubmit: SubmitHandler<LoginRequest> = useCallback(
    async (data) => {
      try {
        const token = await login(data).unwrap();
        dispatch(setCredentials(token));

        const user = await getProfile().unwrap();
        dispatch(setProfile(user));

        navigate("/threads");
      } catch (error) {
        const { status } = error as FetchBaseQueryError;

        if (status === HTTP_STATUS_CODES.UNAUTHORIZED) {
          notyf.error("Email atau password salah");
          return;
        }

        notyf.error("Ada sesuatu yang salah");
      }
    },
    [dispatch, getProfile, login, navigate, notyf],
  );

  return {
    formState,
    handleLoginFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  };
}
