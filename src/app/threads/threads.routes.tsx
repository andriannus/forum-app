import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { Mobile, MobileWithBottomNav } from "@/layouts";

const Threads = lazy(() => import("./threads.component"));
const CreateThread = lazy(
  () => import("./create-thread/create-thread.component"),
);
const DetailThread = lazy(
  () => import("./detail-thread/detail-thread.component"),
);

export const threadsRoutes: RouteObject[] = [
  {
    path: "threads",
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
      {
        path: ":id",
        element: <DetailThread />,
      },
    ],
  },
];
