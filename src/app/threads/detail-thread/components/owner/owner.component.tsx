import PropTypes from "prop-types";
import { FC, memo } from "react";

import { transformToDistanceFormat } from "@/utils";

import { OwnerProps } from "./owner.model";

import "./owner.component.scss";

const Owner: FC<Partial<OwnerProps>> = ({ avatar, createdAt, name }) => {
  return (
    <div className="Owner">
      <div className="Owner-avatar">
        <img src={avatar} alt={name} loading="lazy" />
      </div>

      <div className="Owner-info">
        <strong>{name}</strong>
        <span>{transformToDistanceFormat(createdAt)}</span>
      </div>
    </div>
  );
};

Owner.propTypes = {
  avatar: PropTypes.string,
  createdAt: PropTypes.string,
  name: PropTypes.string,
};

export default memo(Owner);
