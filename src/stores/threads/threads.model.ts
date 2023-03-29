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

export interface ThreadDetailComment extends VotesBy {
  id: string;
  content: string;
  createdAt: string;
  owner: User;
}

export interface ThreadDetail extends ThreadInGeneral, VotesBy {
  comments: ThreadDetailComment[];
  owner: User;
}

export type ThreadDetailResponse = ResponseWithData<{
  detailThread: ThreadDetail;
}>;

export interface ThreadsState {
  threads: Thread[];
}

export interface ThreadCreateRequest {
  title: string;
  category: string;
  body: string;
}

export type ThreadCreateResponse = ResponseWithData<{ thread: Thread }>;
