/**
 * Test scenario for Login Hook
 *
 * - Login hook
 * -- should dispatch action correctly when all API requests success
 */

import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { act, renderHook, waitFor } from "@testing-library/react";
import { fetch, Headers, Request, Response } from "cross-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import type { FC, PropsWithChildren } from "react";
import * as ReactRedux from "react-redux";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { API } from "@/constants";
import { token, user } from "@/mocks";
import type {
  LoginResponse,
  ProfileResponse,
  Response as APIResponse,
} from "@/models";
import { setCredentials, setProfile, setupStore } from "@/stores";

import { useLogin } from "./login.hook";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("react-redux");

  return {
    ...actual,
    useDispatch: () => vi.fn(),
  };
});

describe("Login hook", () => {
  const successResponse: APIResponse = {
    message: "success",
    success: true,
  };

  const handlers = [
    rest.get(`${API.BASE_URL as string}/*`, async (_req, res, ctx) => {
      return await res(ctx.json("OK"));
    }),
  ];

  const server = setupServer(...handlers);

  const useDispatchSpy = vi.spyOn(ReactRedux, "useDispatch");

  beforeEach(() => {
    useDispatchSpy.mockClear();
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should dispatch action correctly when all API requests success", async () => {
    server.use(
      rest.post(`${API.BASE_URL as string}/login`, async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.json<LoginResponse>({
            data: { token },
            ...successResponse,
          }),
        );
      }),
    );

    server.use(
      rest.get(`${API.BASE_URL as string}/users/me`, async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.json<ProfileResponse>({
            data: { user },
            ...successResponse,
          }),
        );
      }),
    );

    const mockDispatch = vi.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);

    const store = setupStore();
    const wrapper: FC<PropsWithChildren> = ({ children }) => (
      <ReactRedux.Provider store={store}>{children}</ReactRedux.Provider>
    );

    const { result } = renderHook(useLogin, { wrapper });

    act(() => {
      result.current.handleLoginFormSubmit({
        email: faker.internet.email(),
        password: faker.datatype.string(8),
      });
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setCredentials(token));
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setProfile(user));
    });
  });
});
