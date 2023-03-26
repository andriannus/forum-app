import { FC } from "react";
import { Outlet } from "react-router-dom";

import { AppBar, BottomNavigationBar, Scaffold } from "@/components";

import "./mobile-with-bottom-nav.component.scss";

const MobileWithBottomNav: FC = () => {
  return (
    <div className="MobileWithBottomNav">
      <Scaffold
        appBar={
          <AppBar>
            <AppBar.Brand>We The Thread</AppBar.Brand>
          </AppBar>
        }
        bottomNavigationBar={<BottomNavigationBar />}
      >
        <Outlet />
      </Scaffold>
    </div>
  );
};

export default MobileWithBottomNav;
