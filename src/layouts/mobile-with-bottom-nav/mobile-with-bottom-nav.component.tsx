import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

import { AppBar, BottomNavigationBar, Scaffold } from "@/components";

import "./mobile-with-bottom-nav.component.scss";

const MobileWithBottomNav: FC = () => {
  return (
    <div className="MobileWithBottomNav">
      <Scaffold
        appBar={
          <AppBar>
            <FontAwesomeIcon
              icon="comment-dots"
              size="xl"
              className="text-red-500"
            />

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
