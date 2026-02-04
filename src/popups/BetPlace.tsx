import React, { useEffect } from "react";
import "./Popup.css";
import { useSocketContext } from "../context/socket/SocketContext";

const BetPlace: React.FC = () => {
  const { betPlaceSucc, setBetPlaceSucc } = useSocketContext();
  useEffect(() => {
    let timer: number;
    if (betPlaceSucc) {
      timer = setTimeout(() => {
        setBetPlaceSucc(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [betPlaceSucc, setBetPlaceSucc]);

  return (
    <div className="toast-center">
      {betPlaceSucc && (
        <div className="toast-container" style={{ color: "#1df59a" }}>
          Bet Placed Successfully
        </div>
      )}
    </div>
  );
};

export default BetPlace;
