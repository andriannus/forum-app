import { act, renderHook } from "@testing-library/react-hooks";
import type { FC, PropsWithChildren } from "react";
import * as ReactRedux from "react-redux";
import { describe, expect, it, vi } from "vitest";

import { removeCredentials, removeProfile, setupStore } from "@/stores";

import { useProfile } from "./profile.hook";

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

describe("Profile hook", () => {
  const useDispatchSpy = vi.spyOn(ReactRedux, "useDispatch");

  beforeEach(() => {
    useDispatchSpy.mockClear();
  });

  it("should dispatch action correctly", async () => {
    const mockDispatch = vi.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);

    const store = setupStore();
    const wrapper: FC<PropsWithChildren> = ({ children }) => (
      <ReactRedux.Provider store={store}>{children}</ReactRedux.Provider>
    );

    const { result } = renderHook(() => useProfile(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(mockDispatch).toHaveBeenCalledWith(removeCredentials());
    expect(mockDispatch).toHaveBeenCalledWith(removeProfile());
  });
});
