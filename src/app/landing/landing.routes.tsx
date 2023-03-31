import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { Guest } from "@/app/auth/components";
import { Mobile } from "@/layouts";

const Landing = lazy(async () => await import("./landing.component"));

export const landingRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <Guest>
        <Mobile />
      </Guest>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
];
