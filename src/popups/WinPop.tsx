import React, { useEffect } from "react";
import "./Popup.css";
import { useSocketContext } from "../context/socket/SocketContext";

const WinPop: React.FC = () => {
  const { winPopup, setWinPopup, settlementData } = useSocketContext();

  useEffect(() => {
    let timer: number;
    if (winPopup) {
      timer = setTimeout(() => {
        setWinPopup(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [winPopup, setWinPopup]);

  return (
    <div className="toast-center">
      {settlementData?.status === "win" ? (
        <div className="toast-container green-toast">{`YOU WON: ${settlementData?.winAmt.toFixed(2)}`}</div>
      ) : (
        <div
          className="toast-container red-toast"
          style={{ width: "40%", display: "flex", justifyContent: "center" }}
        >{`YOU LOSS`}</div>
      )}
    </div>
  );
};

export default WinPop;
