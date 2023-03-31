import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";
import { Mobile, MobileWithBottomNav } from "@/layouts";

const Threads = lazy(async () => await import("./threads.component"));
const CreateThread = lazy(
  async () => await import("./create-thread/create-thread.component"),
);
const DetailThread = lazy(
  async () => await import("./detail-thread/detail-thread.component"),
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
