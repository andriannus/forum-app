import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { MobileWithBottomNav } from "@/layouts";

const Profile = lazy(() => import("./profile.component"));

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
