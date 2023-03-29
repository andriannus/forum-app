import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";
import { User } from "@/models";

import { RootState } from "../store";
import { ProfileResponse } from "./profile.model";

export const profileAPI = createApi({
  reducerPath: "profileAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProfile: build.query<User, void>({
      query: () => "users/me",
      transformResponse: (response: ProfileResponse) => {
        return response.data.user;
      },
    }),
  }),
});

export const { useGetProfileQuery } = profileAPI;
