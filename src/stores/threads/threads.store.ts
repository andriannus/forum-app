import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";
import { ResponseWithData } from "@/models";

import {
  Thread,
  ThreadCreateRequest,
  ThreadCreateResponse,
} from "./threads.model";
import { RootState } from "../store";

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
    getThreads: build.query<Thread[], void>({
      query: () => "threads",
      transformResponse: (
        response: ResponseWithData<{ threads: Thread[] }>,
      ) => {
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
  }),
});

export const { useCreateThreadMutation, useGetThreadsQuery } = threadsAPI;
