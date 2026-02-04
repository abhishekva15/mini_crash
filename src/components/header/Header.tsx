import React from "react";
import "./Header.css";
import { icon } from "../../utils/icon";
import { useSocketContext } from "../../context/socket/SocketContext";
import BetPlace from "../../popups/BetPlace";
import Error from "../../popups/Error";
import WinPop from "../../popups/WinPop";

const Header: React.FC = () => {
  const { betPlaceSucc, errorModel, winPopup } = useSocketContext();
  return (
    <>
      <div className="header">
        <div>
          <div className="header_img">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              className="home-icon"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
            </svg>
          </div>
        </div>

        <div className="header_name">
          <img
            src={icon?.logoIcon}
            alt=""
            width={65}
            style={{ marginTop: "3px" }}
          />
        </div>
      </div>
      {betPlaceSucc && <BetPlace />}
      {errorModel && <Error />}
      {winPopup && <WinPop />}
    </>
  );
};

export default Header;
