import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeCredentials, removeProfile, useAppSelector } from "@/stores";

export function useProfile() {
  const profile = useAppSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch(removeCredentials());
    dispatch(removeProfile());
    navigate("/login");
  }, [dispatch, navigate]);

  return { logout, profile };
}
