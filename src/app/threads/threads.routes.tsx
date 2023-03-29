import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { Mobile, MobileWithBottomNav } from "@/layouts";

const Threads = lazy(() => import("./threads.component"));
const CreateThread = lazy(
  () => import("./create-thread/create-thread.component"),
);

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
  {
    path: "threads",
    element: (
      <Authenticated>
        <Mobile />
      </Authenticated>
    ),
    children: [
      {
        path: "create",
        element: <CreateThread />,
      },
    ],
  },
];
