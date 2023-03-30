import { FC } from "react";

import { useProfile } from "./profile.hook";

import "./profile.component.scss";

const Profile: FC = () => {
  const { logout, profile } = useProfile();

  return (
    <div className="Profile">
      <div className="Profile-body">
        <div className="Profile-avatar">
          <img src={profile?.avatar} alt={profile?.name} loading="lazy" />
        </div>

        <div className="Profile-detail">
          <h2 className="Profile-title">{profile?.name}</h2>
          <h3 className="Profile-subtitle">{profile?.email}</h3>
        </div>

        <button className="Link" type="button" onClick={logout}>
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Profile;
