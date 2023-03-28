import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";
import { createSearchParams, Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "@/stores";

const Authenticated: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);

  if (token) return <>{children}</>;

  return (
    <Navigate
      replace
      to={{
        pathname: "/login",
        search: createSearchParams({
          redirect: location.pathname,
        }).toString(),
      }}
    />
  );
};

Authenticated.propTypes = {
  children: PropTypes.node,
};

export default Authenticated;
