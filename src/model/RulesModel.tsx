import React from "react";
import { icon } from "../utils/icon";
import "./model.css";
import { payoutData } from "../utils/helper";
import { useGameContext } from "../context/GameContext";

const RulesModel: React.FC = () => {
  const { setOpenRulesModal } = useGameContext();
  return (
    <div className="modal-backdrop-history" style={{ zIndex: "102" }}>
      <div className="bet_history_model">
        <div className="bet_history_hrader">
          Game Rules
          <img
            src={icon?.crossIcon}
            alt=""
            className="cross_icon"
            onClick={() => setOpenRulesModal(false)}
          />
        </div>
        <div className="rules_container">
          <ul>
            <li>
              {" "}
              Mini Roulette is a game of chance with a rotating wheel of 12
              numbers, each with red or black background.
            </li>
            <li>
              {" "}
              Player can make a bet on a number or different combinations.{" "}
            </li>
            <li> This is a single player game.</li>
            <li>
              {" "}
              Player wins if one of his selected numbers or combinations matches
              the number hit by the pointer;{" "}
            </li>
            <li> Win multipliers are displayed in the paytable. </li>
          </ul>

          <div className="pout_con">
            <div className="payout_text">Game Interface</div>
            <ul>
              <li>Sound can be turned off and back on from game menu.</li>
              <li>Bet History can be accessed from game menu.</li>
              <li>Rules can be accessed from game play screen.</li>
            </ul>
          </div>

          <div className="pout_con">
            <div className="payout_text">Paytable</div>
            <div className="payout_table">
              <table>
                <thead>
                  <tr>
                    <th>Bet Option</th>
                    <th>Winning Condition</th>
                    <th>Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutData?.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.betOption}</td>
                      <td>{data?.winningCondition}</td>
                      <td>{data?.payout}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesModel;
