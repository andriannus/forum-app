/**
 * Test scenario for Auth Store
 *
 * - Auth Store
 * -- when auth reducer
 * --- should return the initial state
 * --- should set the credentials
 * --- should remove the credentials
 * --- should set the profile
 */

import { describe, expect, it } from "vitest";

import { token } from "@/mocks";
import type { User } from "@/models";

import type { AuthState } from "./auth.model";
import {
  authSlice,
  removeCredentials,
  setCredentials,
  setProfile,
} from "./auth.store";

describe("Auth Store", () => {
  describe("when auth reducer", () => {
    const authReducer = authSlice.reducer;

    let initialState: AuthState;

    beforeEach(() => {
      initialState = { token: null, user: null };
    });

    it("should return the initial state", () => {
      const mockState = authReducer(undefined, { type: undefined });
      expect(mockState).toStrictEqual(initialState);
    });

    it("should set the credentials", () => {
      const expectedState: AuthState = {
        token,
        user: null,
      };

      const mockState = authReducer(initialState, setCredentials(token));

      expect(mockState).toStrictEqual(expectedState);
    });

    it("should remove the credentials", () => {
      const previousState: AuthState = { token, user: null };
      const expectedState: AuthState = { token: null, user: null };

      const mockState = authReducer(previousState, removeCredentials());

      expect(mockState).toStrictEqual(expectedState);
    });

    it("should set the profile", () => {
      const userStub: User = {
        avatar: "http://www.avatar.com",
        email: "email@mail.com",
        id: "123",
        name: "Pengguna",
      };

      const expectedState: AuthState = { token: null, user: userStub };

      const mockState = authReducer(initialState, setProfile(userStub));

      expect(mockState).toStrictEqual(expectedState);
    });
  });
});
