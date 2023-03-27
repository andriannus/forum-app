import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { List as ListLoader } from "react-content-loader";
import { Link } from "react-router-dom";

import { useGetThreadsQuery } from "@/stores/threads";
import { transformToDistanceFormat } from "@/utils";

import "./threads.component.scss";

const Threads: FC = () => {
  const { data: threads, isLoading } = useGetThreadsQuery();

  return (
    <div className="Threads">
      <h2 className="Threads-headline">Mau Diskusi Apa?</h2>

      {isLoading ? (
        <ListLoader />
      ) : (
        <div className="ThreadsList" role="list">
          {threads?.map((thread) => {
            return (
              <Link
                key={thread.id}
                className="ThreadsList-item"
                to={`/threads/${thread.id}`}
              >
                <h6 className="ThreadsList-title">{thread.title}</h6>
                <p className="ThreadsList-subtitle">{thread.ownerId}</p>

                <div className="ThreadsList-info">
                  <div className="ThreadsList-infoItem">
                    <FontAwesomeIcon icon="comments" />
                    <span>{thread.totalComments}</span>
                  </div>

                  <div className="ThreadsList-infoItem">
                    <FontAwesomeIcon icon="clock" />
                    <span>{transformToDistanceFormat(thread.createdAt)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Threads;
