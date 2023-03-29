import { FC } from "react";
import { useRoutes } from "react-router-dom";

import { authRoutes } from "@/app/auth";
import { threadsRoutes } from "@/app/threads";
import { leaderboardsRoutes } from "@/app/leaderboards";

const AppRoutes: FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      children: [...authRoutes, ...threadsRoutes, ...leaderboardsRoutes],
    },
  ]);

  return routes;
};

export default AppRoutes;
