import { FC } from "react";
import { List as Loader } from "react-content-loader";

import { useGetLeaderboardsQuery } from "@/stores";

import "./leaderboards.component.scss";

const Leaderboards: FC = () => {
  const { data: leaderboards, isLoading } = useGetLeaderboardsQuery();

  return (
    <div className="Leaderboards">
      <h2 className="Leaderboards-headline">Klasemen Pengguna Aktif</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="Leaderboards-heading">
            <span>Pengguna</span>
            <span>Skor</span>
          </div>

          <div className="Leaderboards-list">
            {leaderboards?.map((leaderboard, key) => {
              return (
                <div
                  key={leaderboard.user.id}
                  className="Leaderboards-listItem"
                >
                  <div className="Leaderboards-user">
                    <span className="Leaderboards-number">{key + 1}</span>

                    <img
                      className="Leaderboards-avatar"
                      src={leaderboard.user.avatar}
                      alt={leaderboard.user.name}
                      loading="lazy"
                    />

                    <span className="Leaderboards-username">
                      {leaderboard.user.name}
                    </span>
                  </div>

                  <span>{leaderboard.score}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboards;
