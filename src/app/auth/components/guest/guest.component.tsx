import PropTypes from "prop-types";
import type { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/stores";

const Guest: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (token) return <Navigate replace to="/threads" />;

  return <>{children}</>;
};

Guest.propTypes = {
  children: PropTypes.node,
};

export default Guest;
