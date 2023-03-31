import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { List as Loader } from "react-content-loader";
import { Link } from "react-router-dom";

import { transformToDistanceFormat } from "@/utils";

import { FilterThreads } from "./components";
import { useThreads } from "./threads.hook";

import "./threads.component.scss";

const Threads: FC = () => {
  const { filteredThreads, getOwnerName, isThreadsLoading, isUsersLoading } =
    useThreads();

  return (
    <div className="Threads">
      <FilterThreads />

      <h2 className="Threads-headline">Mau Diskusi Apa?</h2>

      {isThreadsLoading ? (
        <Loader />
      ) : (
        <div className="ThreadsList" role="list">
          {filteredThreads?.map((thread) => {
            return (
              <Link
                key={thread.id}
                className="ThreadsList-item"
                to={`/threads/${thread.id as string}`}
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
