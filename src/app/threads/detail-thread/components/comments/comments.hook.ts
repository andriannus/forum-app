import { useCallback } from "react";

import { useAppSelector } from "@/stores";
import type { ThreadComment } from "@/stores";

import type { UseComments } from "./comments.model";

export function useComments(): UseComments {
  const profile = useAppSelector((state) => state.auth.user);

  const getDownvotedStatus = useCallback(
    (comment: ThreadComment) => {
      if (!profile) return false;
      return comment.downVotesBy.includes(profile.id);
    },
    [profile],
  );

  const getUpvotedStatus = useCallback(
    (comment: ThreadComment) => {
      if (!profile) return false;
      return comment.upVotesBy.includes(profile.id);
    },
    [profile],
  );

  return { getDownvotedStatus, getUpvotedStatus };
}
