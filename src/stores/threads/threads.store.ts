import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";

import { RootState } from "../store";
import {
  Thread,
  ThreadCommentRequest,
  ThreadCommentResponse,
  ThreadCommentVoteRequest,
  ThreadCommentVoteResponse,
  ThreadCreateRequest,
  ThreadCreateResponse,
  ThreadDetail,
  ThreadDetailResponse,
  ThreadsResponse,
  ThreadVoteResponse,
} from "./threads.model";

export const threadsAPI = createApi({
  reducerPath: "threadsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getThread: build.query<ThreadDetail, string>({
      query: (id) => `threads/${id}`,
      transformResponse: (response: ThreadDetailResponse) => {
        return response.data.detailThread;
      },
    }),
    getThreads: build.query<Thread[], void>({
      query: () => "threads",
      transformResponse: (response: ThreadsResponse) => {
        return response.data.threads;
      },
    }),
    createThread: build.mutation<ThreadCreateResponse, ThreadCreateRequest>({
      query: (payload) => ({
        url: "threads",
        method: "POST",
        body: payload,
      }),
    }),
    upvoteThread: build.mutation<ThreadVoteResponse, string>({
      query: (id) => ({
        url: `threads/${id}/up-vote`,
        method: "POST",
      }),
    }),
    downvoteThread: build.mutation<ThreadVoteResponse, string>({
      query: (id) => ({
        url: `threads/${id}/down-vote`,
        method: "POST",
      }),
    }),
    neutralizeVoteThread: build.mutation<ThreadVoteResponse, string>({
      query: (id) => ({
        url: `threads/${id}/neutral-vote`,
        method: "POST",
      }),
    }),
    createComment: build.mutation<ThreadCommentResponse, ThreadCommentRequest>({
      query: ({ content, id }) => ({
        url: `threads/${id}/comments`,
        method: "POST",
        body: { content },
      }),
    }),
    upvoteComment: build.mutation<
      ThreadCommentVoteResponse,
      ThreadCommentVoteRequest
    >({
      query: ({ commentID, threadID }) => ({
        url: `threads/${threadID}/comments/${commentID}/up-vote`,
        method: "POST",
      }),
    }),
    downvoteComment: build.mutation<
      ThreadCommentVoteResponse,
      ThreadCommentVoteRequest
    >({
      query: ({ commentID, threadID }) => ({
        url: `threads/${threadID}/comments/${commentID}/down-vote`,
        method: "POST",
      }),
    }),
    neutralizeVoteComment: build.mutation<
      ThreadCommentVoteResponse,
      ThreadCommentVoteRequest
    >({
      query: ({ commentID, threadID }) => ({
        url: `threads/${threadID}/comments/${commentID}/neutral-vote`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useCreateThreadMutation,
  useDownvoteThreadMutation,
  useDownvoteCommentMutation,
  useGetThreadQuery,
  useGetThreadsQuery,
  useNeutralizeVoteCommentMutation,
  useNeutralizeVoteThreadMutation,
  useUpvoteCommentMutation,
  useUpvoteThreadMutation,
} = threadsAPI;
