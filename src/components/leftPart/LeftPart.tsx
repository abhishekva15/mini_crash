import React, { useMemo } from "react";
import "./LeftPart.css";
import InputContainer from "./InputContainer";
import InputMult from "./InputMult";
import { useGameContext } from "../../context/GameContext";
import { getOverUnderOdds } from "../../utils/helper";
import BetButton from "./BetButton";

const LeftPart: React.FC = () => {
  const { planeMult } = useGameContext();

  const odds = useMemo(() => {
    const value = planeMult;

    if (isNaN(value) || value < 1 || value >= 100) {
      return { yes: 0, no: 0 };
    }

    const { multipliers } = getOverUnderOdds(value);

    return {
      yes: multipliers.under, // YES = under
      no: multipliers.over, // NO = over
    };
  }, [planeMult]);

  return (
    <>
      <div className="text_game">Will the Plane Crash Within</div>
      <div className="inc_dec_section">
        <InputMult />
      </div>
      <div className="under_section">
        <div className="under_top">
          <div className="under_text">Yes</div>
          <div className="line_mi"></div>
          <div className="under_text">No</div>
        </div>
        <div className="under_bottom">
          <div className="under_text">{odds?.yes}</div>
          <div className="line_mi_b"></div>
          <div className="under_text">{odds?.no}</div>
        </div>
      </div>
      <InputContainer />
      <BetButton/>
    </>
  );
};

export default LeftPart;
