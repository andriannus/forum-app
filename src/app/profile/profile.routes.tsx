import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { MobileWithBottomNav } from "@/layouts";

const Profile = lazy(async () => await import("./profile.component"));

export const profileRoutes: RouteObject[] = [
  {
    path: "me",
    element: (
      <Authenticated>
        <MobileWithBottomNav />
      </Authenticated>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
];
