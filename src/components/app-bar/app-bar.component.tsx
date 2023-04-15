import PropTypes from "prop-types";
import { memo } from "react";
import type { FC, PropsWithChildren } from "react";

import { AppBarBackButton } from "./app-bar-back-button";
import { AppBarBrand } from "./app-bar-brand";
import { AppBarTitle } from "./app-bar-title";

import "./app-bar.component.scss";

const AppBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div data-cy="app-bar" className="AppBar">
      {children}
    </div>
  );
};

AppBar.propTypes = {
  children: PropTypes.node,
};

export default Object.assign(memo(AppBar), {
  BackButton: AppBarBackButton,
  Brand: AppBarBrand,
  Title: AppBarTitle,
});
