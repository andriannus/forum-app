import { ResponseWithData } from "@/models";

export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
}

export interface ThreadsState {
  threads: Thread[];
}

export interface ThreadCreateRequest {
  title: string;
  category: string;
  body: string;
}

export type ThreadCreateResponse = ResponseWithData<{ thread: Thread }>;
