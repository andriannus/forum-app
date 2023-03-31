import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useNotyf } from "@/context";
import { useCreateThreadMutation } from "@/stores";
import type { ThreadCreateRequest } from "@/stores";

import type { UseCreateThread } from "./create-thread.model";

export function useCreateThread(): UseCreateThread {
  const { formState, handleSubmit, register, watch } =
    useForm<ThreadCreateRequest>({ mode: "onChange" });

  const [values, setValues] = useState<Partial<ThreadCreateRequest>>({});

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const navigate = useNavigate();
  const notyf = useNotyf();
  const [createThread, { isLoading }] = useCreateThreadMutation();

  const handleCreateThreadFormSubmit: SubmitHandler<ThreadCreateRequest> =
    useCallback(
      async (data) => {
        try {
          await createThread(data).unwrap();
          navigate("/threads");
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
