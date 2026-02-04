import React from "react";
import { icon } from "../utils/icon";
import { useGameContext } from "../context/GameContext";

const MenuModel: React.FC = () => {
  const {
    setOpenBetHistory,
    setOpenRulesModal,
    setOpenGameLimits,
    setOpenBetModel,
  } = useGameContext();

  const handleOpenBetHistory = () => {
    setOpenBetHistory(true);
    setOpenBetModel(false);
  };

  const handleOpenRules = () => {
    setOpenRulesModal(true);
    setOpenBetModel(false);
  };

  const handleOpenGameLimits = () => {
    setOpenGameLimits(true);
    setOpenBetModel(false);
  };

  return (
    <div className="menu_model">
      <ul>
        <li>
          <div className="menu-dropdown-list form-check form-switch ">
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon?.animationIcon} alt="" />
              <h6>Sound</h6>
            </div>
          </div>
        </li>
      </ul>
      <ul className="list-menu-modal">
        <li>
          <div
            className="menu-dropdown-list form-check form-switch "
            onClick={handleOpenBetHistory}
          >
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon?.historyIcon} alt="" />
              <h6>My Bet History</h6>
            </div>
          </div>
        </li>
        <li>
          <div
            className="menu-dropdown-list form-check form-switch "
            onClick={handleOpenGameLimits}
          >
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon?.limitIcon} alt="" />
              <h6>Game Limits</h6>
            </div>
          </div>
        </li>
        {/* <li>
          <div className="menu-dropdown-list form-check form-switch ">
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon?.howIcon} alt="" />
              <h6>How To Play</h6>
            </div>
          </div>
        </li> */}
        <li>
          <div
            className="menu-dropdown-list form-check form-switch "
            onClick={handleOpenRules}
          >
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon?.rulesIcon} alt="" />
              <h6>Game Rules</h6>
            </div>
          </div>
        </li>
        <li>
          <div
            className="menu-dropdown-list form-check form-switch "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="menu-dropdown-item aviator-heading">
              {/* <img src={icon?.howIcon} alt="" /> */}
              <h6>Back To Lobby</h6>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MenuModel;
