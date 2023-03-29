import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LoginRequest } from "@/models";
import { useLoginMutation, setCredentials } from "@/stores";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const { formState, handleSubmit, register, watch } = useForm<LoginRequest>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<LoginRequest>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleLoginFormSubmit: SubmitHandler<LoginRequest> = useCallback(
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
