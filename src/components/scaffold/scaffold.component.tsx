import classNames from "classnames";
import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

import { ScaffoldProps } from "./scaffold.model";

import "./scaffold.component.scss";

const Scaffold: FC<PropsWithChildren<Partial<ScaffoldProps>>> = ({
  appBar,
  bottomNavigationBar,
  children,
}) => {
  const scaffoldClass = classNames("Scaffold", {
    "Scaffold--hasBottomNavigationBar": !!bottomNavigationBar,
  });

  return (
    <div className={scaffoldClass}>
      {!!appBar && <header className="Scaffold-appBar">{appBar}</header>}

      <main className="Scaffold-body">{children}</main>

      {!!bottomNavigationBar && (
        <header className="Scaffold-bottomNavigationBar">
          {bottomNavigationBar}
        </header>
      )}
    </div>
  );
};

Scaffold.propTypes = {
  appBar: PropTypes.node,
  bottomNavigationBar: PropTypes.node,
  children: PropTypes.node,
};

export default Scaffold;
