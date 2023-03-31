import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API } from "@/constants";
import type {
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  RegisterRequest,
  User,
} from "@/models";

import type { RootState } from "../store";
import type { AuthState, ProfileResponse } from "./auth.model";

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    removeCredentials: (state) => {
      state.token = null;
    },
    setProfile: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
    },
    removeProfile: (state) => {
      state.user = null;
    },
  },
});

export const { removeCredentials, removeProfile, setCredentials, setProfile } =
  authSlice.actions;

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getProfile: build.mutation<User, void>({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      transformResponse: (response: ProfileResponse) => {
        return response.data.user;
      },
    }),
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
    register: build.mutation<User, RegisterRequest>({
      query: (payload) => ({
        url: "register",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: RegisterResponse) => {
        return response.data.user;
      },
    }),
  }),
});

export const { useGetProfileMutation, useLoginMutation, useRegisterMutation } =
  authAPI;
