import React from "react";
import Header from "../components/header/Header";
import Canvas from "../components/canvas/canvas";
import LeftPart from "../components/leftPart/LeftPart";
import { useSocketContext } from "../context/socket/SocketContext";
import MaxOdds from "../components/maxOdds/MaxOdds";
import MultText from "./MultText";
import { icon } from "../utils/icon";
import MenuModel from "../model/MenuModel";
import { useGameContext } from "../context/GameContext";
import BetHistory from "../model/BetHistory";
import GameLimits from "../model/GameLimits";
import RulesModel from "../model/RulesModel";

const Home: React.FC = () => {
  const {
    openBetModel,
    setOpenBetModel,
    openBetHistory,
    openGameLimits,
    openRulesModal,
  } = useGameContext();
  const { planeData } = useSocketContext();
  const parsedBetData = planeData?.split(":") ?? [];
  const planeMutiplier = parsedBetData.length >= 2 ? parsedBetData[1] : "0";
  const planeStatus: string | number =
    parsedBetData && parsedBetData.length > 0 ? parsedBetData[2] : 0;

  return (
    <>
      <div className="main-container">
        <div className="game-inner-body">
          <div className="game-body">
            <Header />
            <div className="game_section">
              <div className="left_bet_panel">
                <LeftPart />
              </div>
              <div className="right_canvas">
                <MaxOdds />
                <div
                  className="menu_icon"
                  onClick={() => {
                    setOpenBetModel((prv) => !prv);
                  }}
                >
                  <img src={icon?.menuIcon} alt="" />
                </div>
                {openBetModel && <MenuModel />}
                <div className="canvas_section">
                  <Canvas
                    planeMultiplier={planeMutiplier}
                    planeData={planeData}
                  />
                  <MultText
                    planeMultiplier={planeMutiplier}
                    planeStatus={planeStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openBetHistory && <BetHistory />}
      {openGameLimits && <GameLimits />}
      {openRulesModal && <RulesModel />}
    </>
  );
};

export default Home;
