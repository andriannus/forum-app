import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useCallback } from "react";
import { List as Loader } from "react-content-loader";
import { Link } from "react-router-dom";

import { useGetThreadsQuery, useGetUsersQuery } from "@/stores";
import { transformToDistanceFormat } from "@/utils";

import "./threads.component.scss";

const Threads: FC = () => {
  const { data: threads, isLoading: isThreadsLoading } = useGetThreadsQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const getOwnerName = useCallback(
    (ownerID: string) => {
      if (!users) return "-";

      const owner = users.find((user) => user.id === ownerID);
      return owner?.name;
    },
    [users],
  );

  return (
    <div className="Threads">
      <h2 className="Threads-headline">Mau Diskusi Apa?</h2>

      {isThreadsLoading ? (
        <Loader />
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

                {!isUsersLoading && (
                  <p className="ThreadsList-subtitle">
                    {getOwnerName(thread.ownerId)}
                  </p>
                )}

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
