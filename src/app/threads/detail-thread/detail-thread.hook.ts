import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useNotyf } from "@/context";
import {
  useAppSelector,
  useCreateCommentMutation,
  useDownvoteCommentMutation,
  useDownvoteThreadMutation,
  useGetThreadQuery,
  useNeutralizeVoteCommentMutation,
  useNeutralizeVoteThreadMutation,
  useUpvoteCommentMutation,
  useUpvoteThreadMutation,
} from "@/stores";
import type { ThreadCommentRequest } from "@/stores";

import type { UseDetailThread } from "./detail-thread.model";

export function useDetailThread(): UseDetailThread {
  const { id: threadID = "" } = useParams();

  const {
    data: thread,
    isLoading: isThreadLoading,
    refetch,
  } = useGetThreadQuery(threadID, {
    refetchOnMountOrArgChange: true,
  });

  const profile = useAppSelector((state) => state.auth.user);

  const hasUpvotedThread = useMemo(() => {
    if (!thread || !profile) return false;
    return thread.upVotesBy.includes(profile.id);
  }, [profile, thread]);

  const hasDownvotedThread = useMemo(() => {
    if (!thread || !profile) return false;
    return thread.downVotesBy.includes(profile.id);
  }, [profile, thread]);

  const [createComment, { isLoading: isCommentLoading }] =
    useCreateCommentMutation();

  const { formState, handleSubmit, register, resetField, watch } =
    useForm<ThreadCommentRequest>({
      mode: "onChange",
      defaultValues: {
        content: "",
        id: threadID,
      },
    });

  const [values, setValues] = useState<Partial<ThreadCommentRequest>>({});

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const notyf = useNotyf();

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

  const [neutralizeVoteThread] = useNeutralizeVoteThreadMutation();
  const [downvoteThread] = useDownvoteThreadMutation();

  const handleDownvoteThreadClick = useCallback(async () => {
    try {
      if (hasDownvotedThread) {
        await neutralizeVoteThread(threadID).unwrap();
      } else {
        await downvoteThread(threadID).unwrap();
      }

      refetch();
    } catch {
      notyf.error("Ada sesuatu yang salah");
    }
  }, [
    downvoteThread,
    hasDownvotedThread,
    neutralizeVoteThread,
    notyf,
    refetch,
    threadID,
  ]);

  const [upvoteThread] = useUpvoteThreadMutation();

  const handleUpvoteThreadClick = useCallback(async () => {
    try {
      if (hasUpvotedThread) {
        await neutralizeVoteThread(threadID).unwrap();
      } else {
        await upvoteThread(threadID).unwrap();
      }

      refetch();
    } catch {
      notyf.error("Ada sesuatu yang salah");
    }
  }, [
    hasUpvotedThread,
    refetch,
    neutralizeVoteThread,
    notyf,
    threadID,
    upvoteThread,
  ]);

  const [downvoteComment] = useDownvoteCommentMutation();

  const handleCommentDownvote = useCallback(
    async (commentID: string) => {
      try {
        await downvoteComment({ commentID, threadID }).unwrap();
        refetch();
      } catch {
        notyf.error("Ada sesuatu yang salah");
      }
    },
    [downvoteComment, notyf, refetch, threadID],
  );

  const [upvoteComment] = useUpvoteCommentMutation();

  const handleCommentUpvote = useCallback(
    async (commentID: string) => {
      try {
        await upvoteComment({ commentID, threadID }).unwrap();
        refetch();
      } catch {
        notyf.error("Ada sesuatu yang salah");
      }
    },
    [refetch, threadID, upvoteComment, notyf],
  );

  const [neutralizeVoteComment] = useNeutralizeVoteCommentMutation();

  const handleCommentVoteNeutralize = useCallback(
    async (commentID: string) => {
      try {
        await neutralizeVoteComment({ commentID, threadID }).unwrap();
        refetch();
      } catch {
        notyf.error("Ada sesuatu yang salah");
      }
    },
    [refetch, neutralizeVoteComment, threadID, notyf],
  );

  return {
    formState,
    handleCommentDownvote,
    handleCommentFormSubmit,
    handleCommentUpvote,
    handleCommentVoteNeutralize,
    handleDownvoteThreadClick,
    handleSubmit,
    handleUpvoteThreadClick,
    hasDownvotedThread,
    hasUpvotedThread,
    isCommentLoading,
    isThreadLoading,
    register,
    thread,
    values,
  };
}
