import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import type { FC } from "react";
import { Facebook as Loader } from "react-content-loader";

import { AppBar, Button, SEO, Scaffold, TextArea } from "@/components";

import { Comments, Owner } from "./components";
import { useDetailThread } from "./detail-thread.hook";

import "./detail-thread.component.scss";

const DetailThread: FC = () => {
  const {
    formState,
    handleCommentDownvote,
    handleCommentFormSubmit,
    handleCommentUpvote,
    handleCommentVoteNeutralize,
    handleDownvoteThreadClick,
    handleSubmit,
    handleUpvoteThreadClick,
    hasDownvotedThread,
    hasUpvotedThread,
    isCommentLoading,
    isThreadLoading,
    register,
    thread,
    values,
  } = useDetailThread();

  return (
    <>
      <SEO title={`${thread?.title as string} - We The Thread`} />

      <Scaffold
        appBar={
          <AppBar>
            <AppBar.BackButton to="/threads" />
          </AppBar>
        }
      >
        <div className="DetailThread">
          {isThreadLoading ? (
            <Loader />
          ) : (
            <>
              <Owner
                avatar={thread?.owner?.avatar}
                createdAt={thread?.createdAt}
                name={thread?.owner.name}
              />

              <div className="DetailThread-body">
                <h1 className="DetailThread-title">{thread?.title}</h1>

                <p
                  className="DetailThread-content"
                  dangerouslySetInnerHTML={{ __html: thread?.body || "" }}
                ></p>
              </div>

              <div className="DetailThread-actions">
                <button
                  id="BtnUpvoteThread"
                  className={classNames("DetailThread-action", {
                    "is-active": hasUpvotedThread,
                  })}
                  type="button"
                  onClick={handleUpvoteThreadClick}
                >
                  <FontAwesomeIcon icon="thumbs-up" />
                  <span>{thread?.upVotesBy.length}</span>
                </button>

                <button
                  id="BtnDownvoteComment"
                  className={classNames("DetailThread-action", {
                    "is-active": hasDownvotedThread,
                  })}
                  type="button"
                  onClick={handleDownvoteThreadClick}
                >
                  <FontAwesomeIcon icon="thumbs-down" />
                  <span>{thread?.downVotesBy.length}</span>
                </button>

                <div className="DetailThread-action">
                  <FontAwesomeIcon icon="comments" />
                  <span>{thread?.comments.length}</span>
                </div>
              </div>

              <Comments
                items={thread?.comments}
                onDownvote={handleCommentDownvote}
                onNeutralize={handleCommentVoteNeutralize}
                onUpvote={handleCommentUpvote}
              />

              <form
                className="DetailThread-commentSection"
                onSubmit={handleSubmit(handleCommentFormSubmit)}
              >
                <TextArea
                  id="TxtComment"
                  placeholder="Tambah komentar..."
                  value={values.content}
                  {...register("content", { required: true })}
                />

                <Button
                  id="BtnSubmit"
                  color="primary"
                  disabled={!formState.isValid || isCommentLoading}
                  fullWidth
                  small
                  type="submit"
                >
                  {isCommentLoading ? "Mengirim..." : "Kirim"}
                </Button>
              </form>
            </>
          )}
        </div>
      </Scaffold>
    </>
  );
};

export default DetailThread;
