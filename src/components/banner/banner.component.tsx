import classNames from "classnames";
import PropTypes from "prop-types";
import { FC } from "react";

import { BannerProps } from "./banner.model";

import "./banner.component.scss";

const Banner: FC<Partial<BannerProps>> = ({
  center = false,
  subtitle,
  title,
}) => {
  const bannerClass = classNames("Banner", {
    "Banner--center": center,
  });

  return (
    <header className={bannerClass}>
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

export default Banner;
