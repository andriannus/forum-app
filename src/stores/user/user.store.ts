import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";
import { ResponseWithData } from "@/models";

import { User } from "./user.model";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "users",
      transformResponse: (response: ResponseWithData<{ users: User[] }>) => {
        return response.data.users;
      },
    }),
  }),
});

export const { useGetUsersQuery } = userAPI;
