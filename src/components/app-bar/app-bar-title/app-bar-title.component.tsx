import PropTypes from "prop-types";
import { FC, memo, PropsWithChildren } from "react";

import "./app-bar-title.component.scss";

const AppBarTitle: FC<PropsWithChildren> = ({ children }) => {
  return <div className="AppBar-title">{children}</div>;
};

AppBarTitle.propTypes = {
  children: PropTypes.node,
};

export default memo(AppBarTitle);
