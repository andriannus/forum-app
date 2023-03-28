import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";
import { LoginRequest, LoginResponse } from "@/models";

import { AuthState } from "./auth.model";

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    removeCredentials: (state) => {
      state.token = null;
    },
  },
});

export const { removeCredentials, setCredentials } = authSlice.actions;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: (build) => ({
    login: build.mutation<string, LoginRequest>({
      query: (payload) => ({
        url: "login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: LoginResponse) => {
        return response.data.token;
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
