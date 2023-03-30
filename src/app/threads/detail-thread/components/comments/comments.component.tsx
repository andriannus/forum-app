import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FC, useCallback } from "react";

import { ThreadComment } from "@/stores";

import { Owner } from "../owner";
import { useComments } from "./comments.hook";
import { CommentsProps } from "./comments.model";

import "./comments.component.scss";

const Comments: FC<Partial<CommentsProps>> = ({
  onDownvote = () => null,
  items = [],
  onNeutralize = () => null,
  onUpvote = () => null,
}) => {
  const { getDownvotedStatus, getUpvotedStatus } = useComments();

  const handleDownvoteButtonClick = useCallback(
    (comment: ThreadComment) => {
      const hasDownvoteComment = getDownvotedStatus(comment);

      if (hasDownvoteComment) return onNeutralize(comment.id);
      return onDownvote(comment.id);
    },
    [getDownvotedStatus, onDownvote, onNeutralize],
  );

  const handleUpvoteButtonClick = useCallback(
    (comment: ThreadComment) => {
      const hasUpvotedComment = getUpvotedStatus(comment);

      if (hasUpvotedComment) return onNeutralize(comment.id);
      return onUpvote(comment.id);
    },
    [getUpvotedStatus, onNeutralize, onUpvote],
  );

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
              <button
                id="BtnUpvoteComment"
                className={classNames("Comment-action", {
                  "is-active": getUpvotedStatus(item),
                })}
                type="button"
                onClick={() => handleUpvoteButtonClick(item)}
              >
                <FontAwesomeIcon icon="thumbs-up" />
                <span>{item?.upVotesBy.length}</span>
              </button>

              <button
                id="BtnDownvoteComment"
                className={classNames("Comment-action", {
                  "is-active": getDownvotedStatus(item),
                })}
                type="button"
                onClick={() => handleDownvoteButtonClick(item)}
              >
                <FontAwesomeIcon icon="thumbs-down" />
                <span>{item?.downVotesBy.length}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  items: PropTypes.array,
  onDownvote: PropTypes.func,
  onNeutralize: PropTypes.func,
  onUpvote: PropTypes.func,
};

export default Comments;
