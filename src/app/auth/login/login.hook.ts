import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LoginRequest } from "@/models";
import {
  useLoginMutation,
  useGetProfileMutation,
  setCredentials,
  setProfile,
} from "@/stores";

export function useLogin() {
  const { formState, handleSubmit, register, watch } = useForm<LoginRequest>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<LoginRequest>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

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
        console.error(error);
      }
    },
    [dispatch, getProfile, login, navigate],
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
