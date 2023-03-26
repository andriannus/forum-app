import { FC } from "react";
import { useRoutes } from "react-router-dom";

import { threadsRoutes } from "@/app/threads";

const AppRoutes: FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      children: [...threadsRoutes],
    },
  ]);

  return routes;
};

export default AppRoutes;
