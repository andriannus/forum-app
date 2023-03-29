import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Facebook as Loader } from "react-content-loader";
import { useParams } from "react-router-dom";

import { AppBar, Button, Scaffold, TextArea } from "@/components";
import { useGetThreadQuery } from "@/stores";

import { Comments, Owner } from "./components";

import "./detail-thread.component.scss";

const DetailThread: FC = () => {
  const { id = "" } = useParams();
  const { data: thread, isLoading } = useGetThreadQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Scaffold
      appBar={
        <AppBar>
          <AppBar.BackButton to="/threads" />
        </AppBar>
      }
    >
      <div className="DetailThread">
        {isLoading ? (
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

            <div className="DetailThread-commentSection">
              <TextArea placeholder="Tambah komentar..." />

              <Button color="primary" fullWidth small>
                Kirim
              </Button>
            </div>
          </>
        )}
      </div>
    </Scaffold>
  );
};

export default DetailThread;
