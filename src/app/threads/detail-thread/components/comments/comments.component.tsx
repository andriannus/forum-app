import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { FC } from "react";

import { Owner } from "../owner";
import { CommentsProps } from "./comments.model";

import "./comments.component.scss";

const Comments: FC<Partial<CommentsProps>> = ({ items = [] }) => {
  return (
    <div className="Comment-list">
      {items.map((item) => {
        return (
          <div key={item.id} className="Comment-listItem">
            <Owner
              avatar={item.owner.avatar}
              createdAt={item.createdAt}
              name={item.owner.name}
            />

            <p
              className="Comment-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></p>

            <div className="Comment-actions">
              <div className="Comment-action">
                <FontAwesomeIcon icon="thumbs-up" />
                <span>{item?.upVotesBy.length}</span>
              </div>

              <div className="Comment-action">
                <FontAwesomeIcon icon="thumbs-down" />
                <span>{item?.downVotesBy.length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  items: PropTypes.array,
};

export default Comments;
