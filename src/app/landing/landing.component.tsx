import { FC } from "react";
import { Link } from "react-router-dom";

import { Button, Scaffold } from "@/components";

import "./landing.component.scss";

const Landing: FC = () => {
  return (
    <Scaffold>
      <div className="Landing">
        <div className="Landing-banner">
          <h1 className="Landing-title">Halo,</h1>
          <p className="Landing-subtitle">Selamat Datang di We The Thread</p>
        </div>

        <div className="Landing-actions">
          <Button id="BtnRegister" color="primary" fullWidth to="/register">
            Daftar
          </Button>
        </div>

        <p className="Landing-caption">
          Sudah punya akun?{" "}
          <Link id="LnkLogin" className="Link" to="/login">
            Klik disini
          </Link>
        </p>
      </div>
    </Scaffold>
  );
};

export default Landing;
