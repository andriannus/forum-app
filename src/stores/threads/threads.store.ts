import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";

import { RootState } from "../store";
import {
  Thread,
  ThreadCommentRequest,
  ThreadCommentResponse,
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
    prepareHeaders: (headers, { getState, type }) => {
      const { token } = (getState() as RootState).auth;

      if (type === "mutation") {
        headers.set("Authorization", `Bearer ${token}`);
      }

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
    createComment: build.mutation<ThreadCommentResponse, ThreadCommentRequest>({
      query: ({ content, id }) => ({
        url: `threads/${id}/comments`,
        method: "POST",
        body: { content },
      }),
    }),
    upVoteThread: build.mutation<ThreadVoteResponse, string>({
      query: (id) => ({
        url: `threads/${id}/up-vote`,
        method: "POST",
      }),
    }),
    downVoteThread: build.mutation<ThreadVoteResponse, string>({
      query: (id) => ({
        url: `threads/${id}/down-vote`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useCreateThreadMutation,
  useDownVoteThreadMutation,
  useGetThreadQuery,
  useGetThreadsQuery,
  useUpVoteThreadMutation,
} = threadsAPI;
