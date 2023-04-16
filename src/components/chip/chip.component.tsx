import classNames from "classnames";
import PropTypes from "prop-types";
import type { FC, PropsWithChildren } from "react";

import type { ChipProps } from "./chip.model";

import "./chip.component.scss";

const Chip: FC<PropsWithChildren<Partial<ChipProps>>> = ({
  active = false,
  button = false,
  children,
  onClick = () => null,
  small = false,
  ...props
}) => {
  const chipClass = classNames("Chip", {
    "Chip--button": button,
    "Chip--small": small,
    "is-active": active,
  });

  return (
    <div className={chipClass} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

Chip.propTypes = {
  active: PropTypes.bool,
  button: PropTypes.bool,
  children: PropTypes.node,
  small: PropTypes.bool,
};

export default Chip;
