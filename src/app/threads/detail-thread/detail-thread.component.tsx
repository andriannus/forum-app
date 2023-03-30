import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Facebook as Loader } from "react-content-loader";

import { AppBar, Button, Scaffold, TextArea } from "@/components";

import { Comments, Owner } from "./components";
import { useDetailThread } from "./detail-thread.hook";

import "./detail-thread.component.scss";

const DetailThread: FC = () => {
  const {
    formState,
    handleCommentFormSubmit,
    handleSubmit,
    isCommentLoading,
    isThreadLoading,
    register,
    thread,
    values,
  } = useDetailThread();

  return (
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
              <div className="DetailThread-action">
                <FontAwesomeIcon icon="thumbs-up" />
                <span>{thread?.upVotesBy.length}</span>
              </div>

              <div className="DetailThread-action">
                <FontAwesomeIcon icon="thumbs-down" />
                <span>{thread?.downVotesBy.length}</span>
              </div>

              <div className="DetailThread-action">
                <FontAwesomeIcon icon="comments" />
                <span>{thread?.comments.length}</span>
              </div>
            </div>

            <Comments items={thread?.comments} />

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
  );
};

export default DetailThread;
