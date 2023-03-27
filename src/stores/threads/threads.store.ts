import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";
import { ResponseWithData } from "@/models";

import { Thread } from "./threads.model";

export const threadsAPI = createApi({
  reducerPath: "threadsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: (build) => ({
    getThreads: build.query<ResponseWithData<Thread[]>, void>({
      query: () => "threads",
    }),
  }),
});

export const { useGetThreadsQuery } = threadsAPI;
