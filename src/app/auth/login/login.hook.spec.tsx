import { faker } from "@faker-js/faker";
import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import type { FC, PropsWithChildren } from "react";
import * as ReactRedux from "react-redux";
import { describe, expect, it, vi } from "vitest";

import { API } from "@/constants";
import type { LoginResponse, ProfileResponse, Response, User } from "@/models";
import { setCredentials, setProfile, setupStore } from "@/stores";
import { server } from "@/utils";

import { useLogin } from "./login.hook";

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

const successResponse: Response = {
  message: "success",
  success: true,
};

const tokenStub = faker.datatype.uuid();

const userStub: User = {
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  id: faker.datatype.string(),
  name: faker.name.fullName(),
};

describe("Login hook", () => {
  const useDispatchSpy = vi.spyOn(ReactRedux, "useDispatch");

  beforeEach(() => {
    useDispatchSpy.mockClear();
  });

  it("should dispatch action correctly when all API requests success", async () => {
    server.use(
      rest.post(`${API.BASE_URL as string}/login`, async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.json<LoginResponse>({
            data: { token: tokenStub },
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
            data: { user: userStub },
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

    const { result, waitForNextUpdate } = renderHook(useLogin, { wrapper });

    act(() => {
      result.current.handleLoginFormSubmit({
        email: faker.internet.email(),
        password: faker.datatype.string(8),
      });
    });

    await waitForNextUpdate();

    expect(mockDispatch).toHaveBeenCalledWith(setCredentials(tokenStub));

    await waitForNextUpdate();

    expect(mockDispatch).toHaveBeenCalledWith(setProfile(userStub));
  });
});
