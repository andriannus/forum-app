import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { FC, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./app-bar-back-button.component.scss";

const AppBarBackButton: FC<Partial<{ to: string }>> = ({ to = "" }) => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      {to ? (
        <Link
          id="BtnAppBarBack"
          aria-label="Back"
          className="AppBar-backButton"
          role="button"
          to={to}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </Link>
      ) : (
        <button
          id="BtnAppBarBack"
          aria-label="Back"
          className="AppBar-backButton"
          type="button"
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </button>
      )}
    </>
  );
};

AppBarBackButton.propTypes = {
  to: PropTypes.string,
};

export default memo(AppBarBackButton);
