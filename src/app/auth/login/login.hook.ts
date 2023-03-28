import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLoginMutation, setCredentials } from "@/stores";

import { LoginForm } from "./login.model";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

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
      try {
        const token = await login(data).unwrap();
        dispatch(setCredentials(token));
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, login, navigate],
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
