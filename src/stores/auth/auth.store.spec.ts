import { describe, expect, it } from "vitest";

import type { User } from "@/models";

import {
  authSlice,
  removeCredentials,
  setCredentials,
  setProfile,
} from "./auth.store";
import type { AuthState } from "./auth.model";

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
      const expectedState: AuthState = { token: "123", user: null };

      const mockState = authReducer(initialState, setCredentials("123"));

      expect(mockState).toStrictEqual(expectedState);
    });

    it("should remove the credentials", () => {
      const previousState: AuthState = { token: "123", user: null };
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
