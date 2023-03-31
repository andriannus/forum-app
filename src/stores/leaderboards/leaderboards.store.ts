import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";
import type { ResponseWithData } from "@/models";

import type { Leaderboard } from "./leaderboards.model";

export const leaderboardsAPI = createApi({
  reducerPath: "leaderboardsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: (build) => ({
    getLeaderboards: build.query<Leaderboard[], void>({
      query: () => "leaderboards",
      transformResponse: (
        response: ResponseWithData<{ leaderboards: Leaderboard[] }>,
      ) => {
        return response.data.leaderboards;
      },
    }),
  }),
});

export const { useGetLeaderboardsQuery } = leaderboardsAPI;
