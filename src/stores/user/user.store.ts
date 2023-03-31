import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";

import type { User, UserResponse } from "./user.model";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "users",
      transformResponse: (response: UserResponse) => {
        return response.data.users;
      },
    }),
  }),
});

export const { useGetUsersQuery } = userAPI;
