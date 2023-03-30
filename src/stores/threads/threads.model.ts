import { ResponseWithData, User } from "@/models";

export interface ThreadInGeneral {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
}

export interface VotesBy {
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface Thread extends ThreadInGeneral, VotesBy {
  ownerId: string;
  totalComments: number;
}

export type ThreadsResponse = ResponseWithData<{ threads: Thread[] }>;

export interface ThreadComment extends VotesBy {
  id: string;
  content: string;
  createdAt: string;
  owner: User;
}

export interface ThreadDetail extends ThreadInGeneral, VotesBy {
  comments: ThreadComment[];
  owner: User;
}

export type ThreadDetailResponse = ResponseWithData<{
  detailThread: ThreadDetail;
}>;

export interface ThreadsState {
  categories: string[] | null;
  selectedCategory: string | null;
  threads: Thread[] | null;
  filteredThreads: Thread[] | null;
}

export interface ThreadCreateRequest {
  title: string;
  category: string;
  body: string;
}

export type ThreadCreateResponse = ResponseWithData<{ thread: Thread }>;

export interface ThreadCommentRequest {
  content: string;
  id: string;
}

export type ThreadCommentResponse = ResponseWithData<{
  comment: ThreadComment;
}>;

export interface Vote {
  id: string;
  userId: string;
  voteType: 1 | -1;
}

export type ThreadVoteResponse = ResponseWithData<{
  vote: { threadId: string } & Vote;
}>;

export interface ThreadCommentVoteRequest {
  threadID: string;
  commentID: string;
}

export type ThreadCommentVoteResponse = ResponseWithData<{
  vote: { commentId: string } & Vote;
}>;
