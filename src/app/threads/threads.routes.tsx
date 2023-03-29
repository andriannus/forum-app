import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { MobileWithBottomNav } from "@/layouts";

const Threads = lazy(() => import("./threads.component"));

export const threadsRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <Authenticated>
        <MobileWithBottomNav />
      </Authenticated>
    ),
    children: [
      {
        index: true,
        element: <Threads />,
      },
    ],
  },
];
