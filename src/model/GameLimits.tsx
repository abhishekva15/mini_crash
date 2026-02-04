import React from "react";
import { icon } from "../utils/icon";
import { useGameContext } from "../context/GameContext";

const GameLimits: React.FC = () => {
  const { setOpenGameLimits } = useGameContext();
  return (
    <div className="modal-backdrop-history" style={{ zIndex: "1000" }}>
      <div className="bet_history_model">
        <div className="bet_history_hrader">
          Game Limits
          <img
            src={icon?.crossIcon}
            alt=""
            className="cross_icon"
            onClick={() => setOpenGameLimits(false)}
          />
        </div>
        <div className="r_container">
          <div className="r_text_top">
            Game limits are managed by operator. Current game limits for this
            game are below:
          </div>
          <div className="r_limits_section bottom_border">
            <div className="r_limit_text">Minimum bet</div>
            <div className="r-limit_money">25.00</div>
          </div>
          <div className="r_limits_section bottom_border">
            <div className="r_limit_text">Maximum bet</div>
            <div className="r-limit_money">25,000.00</div>
          </div>
          <div className="r_limits_section">
            <div className="r_limit_text">Minimum win for one round</div>
            <div className="r-limit_money">2,00,000.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLimits;
