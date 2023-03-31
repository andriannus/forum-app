import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { MobileWithBottomNav } from "@/layouts";

const Leaderboards = lazy(async () => await import("./leaderboards.component"));

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
