import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Mobile } from "@/layouts";

import { Guest } from "./components";

const Login = lazy(() => import("./login/login.component"));
const Register = lazy(() => import("./register/register.component"));

export const authRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <Guest>
        <Mobile />
      </Guest>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
