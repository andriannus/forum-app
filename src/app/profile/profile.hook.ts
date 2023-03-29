import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeCredentials } from "@/stores";

export function useProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch(removeCredentials());
    navigate("/login");
  }, [dispatch, navigate]);

  return { logout };
}
