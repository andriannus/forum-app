import { FC } from "react";
import { useRoutes } from "react-router-dom";

import { authRoutes } from "@/app/auth";
import { threadsRoutes } from "@/app/threads";

const AppRoutes: FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      children: [...authRoutes, ...threadsRoutes],
    },
  ]);

  return routes;
};

export default AppRoutes;
