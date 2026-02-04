import React, { useEffect } from "react";
import "./Popup.css";
import { useHomeContext } from "../context/HomeConetx";

const MaxBetPopup: React.FC = () => {
  const { maxBetPopup, setMaxBetPopup } = useHomeContext();
  useEffect(() => {
    let timer: number;
    if (maxBetPopup) {
      timer = setTimeout(() => {
        setMaxBetPopup(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [maxBetPopup, setMaxBetPopup]);
  return (
    <div className="toast-center">
      <div className="toast-container green-toast">{`Max Bet Amount: 25,000`}</div>
    </div>
  );
};

export default MaxBetPopup;
