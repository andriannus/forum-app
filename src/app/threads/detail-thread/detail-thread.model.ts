import type {
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import type { ThreadCommentRequest, ThreadDetail } from "@/stores";

export interface UseDetailThread {
  formState: FormState<ThreadCommentRequest>;
  handleCommentDownvote: (commentID: string) => Promise<void>;
  handleCommentFormSubmit: SubmitHandler<ThreadCommentRequest>;
  handleCommentUpvote: (commentID: string) => Promise<void>;
  handleCommentVoteNeutralize: (commentID: string) => Promise<void>;
  handleDownvoteThreadClick: () => Promise<void>;
  handleSubmit: UseFormHandleSubmit<ThreadCommentRequest>;
  handleUpvoteThreadClick: () => Promise<void>;
  hasDownvotedThread: boolean;
  hasUpvotedThread: boolean;
  isCommentLoading: boolean;
  isThreadLoading: boolean;
  register: UseFormRegister<ThreadCommentRequest>;
  thread?: ThreadDetail;
  values: Partial<ThreadCommentRequest>;
}
