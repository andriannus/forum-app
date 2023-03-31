import type { ThreadComment } from "@/stores";

export interface CommentsProps {
  onDownvote: (commentID: string) => void;
  items: ThreadComment[];
  onNeutralize: (commentID: string) => void;
  onUpvote: (commentID: string) => void;
}

export interface UseComments {
  getDownvotedStatus: (comment: ThreadComment) => boolean;
  getUpvotedStatus: (comment: ThreadComment) => boolean;
}
