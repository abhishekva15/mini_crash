import React from "react";
import { useSocketContext } from "../../context/socket/SocketContext";
import { useGameContext } from "../../context/GameContext";

const InputContainer: React.FC = () => {
  const { info, planeData } = useSocketContext();
  const { amount, setAmount } = useGameContext();

  const maxAmount: number = Math.min(Number(info.balance), 25000.0);
  const minAmount: number = 20.0;
  const parsedBetData: string[] | null =
    planeData.length > 0 ? planeData.split(":") : null;
  const planeStatus: string | number =
    parsedBetData && parsedBetData.length > 0 ? parsedBetData[2] : 0;
  const disableButton: boolean =
    planeStatus == 1 || planeStatus == 2 ;

  const handleIncrease = () => {
    if (disableButton || Number(amount) == maxAmount) return;
    if (Number(amount) == maxAmount) return;
    if (Number(amount) > Number(info.balance) || +amount === 0) {
      return;
    }

    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = minAmount;
    } else {
      numericValue += minAmount;
      if (numericValue > maxAmount) {
        numericValue = maxAmount;
      }
    }
    setAmount(numericValue.toFixed(2));
  };

  const handleDecrease = () => {
    if (disableButton || Number(amount) == minAmount) return;
    if (Number(amount) == minAmount) return;
    if (Number(amount) > Number(info.balance) || +amount === 0) {
      return;
    }
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = minAmount;
    } else if (numericValue > minAmount) {
      numericValue -= minAmount;
    }
    numericValue = Math.max(minAmount, numericValue);
    setAmount(numericValue.toFixed(2));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    if (inputValue.length <= 10 && /^\d*\.?\d{0,2}$/.test(inputValue)) {
      let numericValue = parseFloat(inputValue);
      if (!isNaN(numericValue) && numericValue > maxAmount) {
        setAmount(maxAmount.toFixed(2));
      } else {
        setAmount(inputValue); // Allow user to type even incomplete numbers like "12."
      }
    }
  };

  const handleAmountChangeBlur = (
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    let numericValue = parseFloat(event.target.value);
    if (isNaN(numericValue) || event.target.value === "") {
      numericValue = minAmount;
    } else {
      if (numericValue < minAmount) {
        numericValue = minAmount;
      } else if (numericValue > maxAmount) {
        numericValue = maxAmount;
      }
    }
    setAmount(numericValue.toFixed(2));
  };

  return (
    <div className="input-click-btn">
      <button
        disabled={disableButton}
        className="minius_btn"
        style={{
          cursor:
            disableButton || Number(amount) === minAmount ? "default" : "",
        }}
        onClick={() => handleDecrease()}
      ></button>
      <input
        type="text"
        disabled={disableButton}
        style={{ color: disableButton ? "#9ea0a3" : "white" }}
        name=""
        id=""
        className="input-value"
        value={amount}
        max={maxAmount}
        onBlur={handleAmountChangeBlur}
        onKeyDown={(e) => {
          if (
            e.key === "e" ||
            e.key === "E" ||
            e.key === "+" ||
            e.key === "-"
          ) {
            e.preventDefault();
          }
        }}
        onChange={(event) => handleAmountChange(event)}
      />

      <button
        className="plus_btn"
        disabled={disableButton}
        style={{
          cursor:
            disableButton || Number(amount) === maxAmount ? "default" : "",
        }}
        onClick={() => handleIncrease()}
      ></button>
    </div>
  );
};

export default InputContainer;
