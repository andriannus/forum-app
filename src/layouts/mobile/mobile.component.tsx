import type { FC } from "react";
import { Outlet } from "react-router-dom";

import "./mobile.component.scss";

const Mobile: FC = () => {
  return (
    <div className="Mobile">
      <Outlet />
    </div>
  );
};

export default Mobile;
