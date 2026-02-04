import React from "react";
import { icon } from "../../utils/icon";
import { useGameContext } from "../../context/GameContext";

const InputMult: React.FC = () => {
  const { planeMult, setPlaneMult, betPlaced } = useGameContext();
  const isDecrementDisabled = planeMult <= 1;
  const isIncrementDisabled = planeMult >= 100;

  const handleIncrement = () => {
    setPlaneMult((prev: number) => (prev < 100 ? prev + 1 : prev));
  };

  const handleDecrement = () => {
    setPlaneMult((prev: number) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="inc_dec">
      <div
        className={`btn_in ${isDecrementDisabled ? "disbale_btn" : ""} ${betPlaced ? "disbale_btn" : ""}`}
        onClick={handleDecrement}
      >
        <img
          src={icon?.upDownIcon}
          alt="decrement"
          style={{ transform: "rotate(180deg)", cursor: "pointer" }}
        />
      </div>

      <div className="time_inc">{planeMult.toFixed(2)} x</div>

      <div
        className={`btn_in ${isIncrementDisabled ? "disbale_btn" : ""} ${betPlaced ? "disbale_btn" : ""}`}
        onClick={handleIncrement}
      >
        <img
          src={icon?.upDownIcon}
          alt="increment"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default InputMult;
