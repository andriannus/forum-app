import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { MobileWithBottomNav } from "@/layouts";

const Leaderboards = lazy(() => import("./leaderboards.component"));

export const leaderboardsRoutes: RouteObject[] = [
  {
    path: "leaderboards",
    element: (
      <Authenticated>
        <MobileWithBottomNav />
      </Authenticated>
    ),
    children: [
      {
        index: true,
        element: <Leaderboards />,
      },
    ],
  },
];
