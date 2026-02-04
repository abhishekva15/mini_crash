import React, {useEffect, useMemo, useState } from "react";
import { useSocketContext } from "../../context/socket/SocketContext";
import { useGameContext } from "../../context/GameContext";
import { getOverUnderOdds } from "../../utils/helper";

const BetButton: React.FC = () => {
  const {
    amount,
    planeMult,
    setAmount,
    betPlaced,
    setBetPlaced,
    betClick,
    setBetClick,
  } = useGameContext();
  const { planeData, socket, betData, info } = useSocketContext();
  const [btn1Cancel, setBtn1Cancel] = useState<boolean>(false);
  const [btn2Cancel, setBtn2Cancel] = useState<boolean>(false);

  const parsedBetData: string[] | null =
    planeData.length > 0 ? planeData.split(":") : null;
  const planeStatus: string | number =
    parsedBetData && parsedBetData.length > 0 ? parsedBetData[2] : 0;
  const lobbyId: string | number =
    parsedBetData && parsedBetData.length > 2 ? parsedBetData[0] : 0;

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

  const handleBet = (chip: number) => {
    if (!socket) return;
    setBetClick(chip);
    const selectedOdd = chip === 1 ? odds.yes : odds.no;
    if (planeStatus == 0) {
      console.log("BetP");
      setBetPlaced(true);
      socket.emit("message", `BT:${lobbyId}:${chip}:${amount}:${selectedOdd}`);
    }

    if (planeStatus == 2 || planeStatus == 3) {
      if (chip == 1) {
        setBtn1Cancel(true);
      }
      if (chip == 2) {
        setBtn2Cancel(true);
      }
    }
  };

  const handleCancle = (chip: number) => {
    setBetClick(null);
    if (chip === 1) setBtn1Cancel(false);
    if (chip === 2) setBtn2Cancel(false);
  };

  useEffect(() => {
    const useData = betData?.find((data) => data?.user_id == info?.user_id);

    if (useData != undefined) {
      setBetPlaced(true);
      setBetClick(useData?.chip);
    }
  }, [betData]);

  useEffect(() => {
    if (planeStatus == 3 && betPlaced) {
      setBetPlaced(false);
      setAmount("20.00");
      setBetClick(null);
    }

    if (planeStatus == 0 && (btn1Cancel || btn2Cancel) && betClick && socket) {
      const selectedOdd = betClick === 1 ? odds.yes : odds.no;
      socket.emit(
        "message",
        `BT:${lobbyId}:${betClick}:${amount}:${selectedOdd}`,
      );
      setBtn1Cancel(false);
      setBtn2Cancel(false);
      setBetPlaced(true);
    }
  }, [planeStatus, betClick]);

  if (planeStatus == 1) {
    return (
      <div className="yes_no_btn">
        <button disabled className="processing_btn">
          <p>PROCESSING</p>
        </button>
      </div>
    );
  }

  return (
    <div className="yes_no_btn">
      {betClick == 1 && btn1Cancel ? (
        <button
          className={`yes_btn ${btn1Cancel ? "cancel-btn" : ""} `}
          onClick={() => handleCancle(1)}
        >
          {`CANCEL`}
        </button>
      ) : (
        <button
          className={`yes_btn ${betPlaced || btn2Cancel ? "disbale_btn " : ""} `}
          onClick={() => handleBet(1)}
        >
          {`${betPlaced && betClick == 1 ? "BET PLACED" : "YES"}`}
        </button>
      )}
      {betClick == 2 && btn2Cancel ? (
        <button
          className={`yes_btn ${btn2Cancel ? "cancel-btn" : ""} `}
          onClick={() => handleCancle(2)}
        >
          {`CANCEL`}
        </button>
      ) : (
        <button
          className={`yes_btn ${betPlaced || btn1Cancel ? "disbale_btn " : ""} `}
          onClick={() => handleBet(2)}
        >
          {`${betPlaced && betClick == 2 ? "BET PLACED" : "NO"}`}
        </button>
      )}
    </div>
  );
};

export default BetButton;
