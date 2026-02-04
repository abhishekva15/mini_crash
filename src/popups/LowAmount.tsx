import React, { useEffect } from "react";
import "./Popup.css";
import { useHomeContext } from "../context/HomeConetx";

const LowAmount: React.FC = () => {
  const { balancePopup, setBalancePopup } = useHomeContext();
  useEffect(() => {
    let timer: number;
    if (balancePopup) {
      timer = setTimeout(() => {
        setBalancePopup(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [balancePopup, setBalancePopup]);
  return (
    <div className="toast-center">
      {balancePopup && (
        <div className="toast-container red-toast">Insufficient Balance</div>
      )}
    </div>
  );
};

export default LowAmount;
