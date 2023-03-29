import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useNotyf } from "@/context";
import { ThreadCreateRequest, useCreateThreadMutation } from "@/stores";

export function useCreateThread() {
  const navigate = useNavigate();
  const notyf = useNotyf();
  const [createThread, { isLoading }] = useCreateThreadMutation();

  const { formState, handleSubmit, register, watch } =
    useForm<ThreadCreateRequest>({
      mode: "onChange",
    });

  const [values, setValues] = useState({} as Partial<ThreadCreateRequest>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleCreateThreadFormSubmit: SubmitHandler<ThreadCreateRequest> =
    useCallback(
      async (data) => {
        try {
          await createThread(data).unwrap();
          navigate("/");
        } catch (error) {
          notyf.error("Ada sesuatu yang salah");
        }
      },
      [createThread, navigate, notyf],
    );

  return {
    formState,
    handleCreateThreadFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  };
}
