import PropTypes from "prop-types";
import { memo } from "react";
import type { FC, PropsWithChildren } from "react";

import "./app-bar-brand.component.scss";

const AppBarBrand: FC<PropsWithChildren> = ({ children }) => {
  return <div className="AppBar-brand">{children}</div>;
};

AppBarBrand.propTypes = {
  children: PropTypes.node,
};

export default memo(AppBarBrand);
