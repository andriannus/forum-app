import classNames from "classnames";
import PropTypes from "prop-types";
import { memo } from "react";
import type { FC } from "react";

import type { BannerProps } from "./banner.model";

import "./banner.component.scss";

const Banner: FC<Partial<BannerProps>> = ({
  center = false,
  subtitle,
  title,
  ...props
}) => {
  const bannerClass = classNames("Banner", {
    "Banner--center": center,
  });

  return (
    <header className={bannerClass} {...props}>
      {title && <h1 className="Banner-title">{title}</h1>}
      {subtitle && <p className="Banner-subtitle">{subtitle}</p>}
    </header>
  );
};

Banner.propTypes = {
  center: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default memo(Banner);
