import { RouteObject } from "react-router-dom";

import { MobileWithBottomNav } from "@/layouts";

import { Threads } from "../threads";

export const threadsRoutes: RouteObject[] = [
  {
    path: "",
    element: <MobileWithBottomNav />,
    children: [
      {
        index: true,
        element: <Threads />,
      },
    ],
  },
];
