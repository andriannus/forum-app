import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

import { AppBarBackButton } from "./app-bar-back-button";
import { AppBarBrand } from "./app-bar-brand";
import { AppBarTitle } from "./app-bar-title";

import "./app-bar.component.scss";

const AppBar: FC<PropsWithChildren> = ({ children }) => {
  return <div className="AppBar">{children}</div>;
};

AppBar.propTypes = {
  children: PropTypes.node,
};

export default Object.assign(AppBar, {
  BackButton: AppBarBackButton,
  Brand: AppBarBrand,
  Title: AppBarTitle,
});
