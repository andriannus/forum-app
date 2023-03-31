import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback } from "react";
import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { MENUS } from "./bottom-navigation-bar.constant";

import "./bottom-navigation-bar.component.scss";

const BottomNavigationBar: FC = () => {
  const getNavLinkClass = useCallback((isActive: boolean) => {
    let navLinkClass = "BottomNavigationBar-menu";

    if (isActive) {
      navLinkClass += " is-active";
    }

    return navLinkClass;
  }, []);

  return (
    <nav aria-label="Main Navigation" className="BottomNavigationBar">
      {MENUS.map((menu) => {
        return (
          <NavLink
            key={menu.id}
            className={({ isActive }) => getNavLinkClass(isActive)}
            title={menu.title}
            to={menu.to}
          >
            <FontAwesomeIcon icon={menu.icon} size="xl" />
            <span className="BottomNavigationBar-menuText">{menu.title}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default memo(BottomNavigationBar);
