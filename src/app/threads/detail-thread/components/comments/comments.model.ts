import { ThreadComment } from "@/stores";

export interface CommentsProps {
  onDownvote(commentID: string): void;
  items: ThreadComment[];
  onNeutralize(commentID: string): void;
  onUpvote(commentID: string): void;
}
