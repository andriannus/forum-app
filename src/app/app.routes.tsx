import { FC } from "react";
import { useRoutes } from "react-router-dom";

import { authRoutes } from "@/app/auth";
import { leaderboardsRoutes } from "@/app/leaderboards";
import { profileRoutes } from "@/app/profile";
import { threadsRoutes } from "@/app/threads";

const AppRoutes: FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      children: [
        ...authRoutes,
        ...leaderboardsRoutes,
        ...profileRoutes,
        ...threadsRoutes,
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
