import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useNotyf } from "@/context";
import {
  ThreadCommentRequest,
  useCreateCommentMutation,
  useGetThreadQuery,
} from "@/stores";

export function useDetailThread() {
  const { id = "" } = useParams();
  const {
    data: thread,
    isLoading: isThreadLoading,
    refetch,
  } = useGetThreadQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [createComment, { isLoading: isCommentLoading }] =
    useCreateCommentMutation();

  const notyf = useNotyf();

  const { formState, handleSubmit, register, resetField, watch } =
    useForm<ThreadCommentRequest>({
      mode: "onChange",
      defaultValues: {
        content: "",
        id,
      },
    });

  const [values, setValues] = useState({} as Partial<ThreadCommentRequest>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleCommentFormSubmit: SubmitHandler<ThreadCommentRequest> =
    useCallback(
      async (data) => {
        try {
          await createComment(data).unwrap();
          resetField("content");
          notyf.success("Berhasil membuat komentar");
          refetch();
        } catch {
          notyf.error("Ada sesuatu yang salah");
        }
      },
      [createComment, notyf, refetch, resetField],
    );

  return {
    formState,
    handleCommentFormSubmit,
    handleSubmit,
    isCommentLoading,
    isThreadLoading,
    register,
    thread,
    values,
  };
}
