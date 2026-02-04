import React, { useEffect, useState } from "react";
import "./home.css";

const CountDown: React.FC = () => {
  const timer = 15;
  const totalTime = timer;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="progress-wrap">
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: "#e50439",
          transition: "width 1s linear",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default CountDown;
