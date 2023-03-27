import classNames from "classnames";
import PropTypes from "prop-types";
import { FC, memo, PropsWithChildren, useMemo } from "react";
import { Link } from "react-router-dom";

import { ButtonProps } from "./button.model";

import "./button.component.scss";

const Button: FC<PropsWithChildren<Partial<ButtonProps>>> = ({
  children,
  color = "",
  disabled = false,
  fullWidth = false,
  id = "",
  onClick = () => null,
  outlined = false,
  rounded = false,
  small = false,
  to = "",
  type = "button",
}) => {
  const hasURL = useMemo(() => !!to, [to]);

  const buttonClasses = classNames("Button", {
    [`Button--${color}`]: !!color,
    ["Button--fullWidth"]: fullWidth,
    ["Button--outlined"]: outlined,
    ["Button--rounded"]: rounded,
    ["Button--small"]: small,
  });

  return (
    <>
      {hasURL && (
        <Link className={buttonClasses} to={to}>
          {children}
        </Link>
      )}

      {!hasURL && (
        <button
          id={id}
          className={buttonClasses}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(["", "primary", "success"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default memo(Button);
