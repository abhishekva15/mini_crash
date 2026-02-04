import React from "react";
import CountDown from "./CountDown";
import { icon } from "../utils/icon";
import "./home.css";

interface multProp {
  planeStatus: number | string;
  planeMultiplier: string | number;
}

const MultText: React.FC<multProp> = ({ planeStatus, planeMultiplier }) => {
  return (
    <div
      className={`multiplier ${planeStatus == 0 ? "mult-pos" : ""}`}
      style={{
        color: planeStatus == 3 ? "red" : "white",
        minWidth: "60px",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {planeStatus == 3 && <p className="flew show">Flew away !</p>}

      {(planeStatus == 2 || planeStatus == 3) && Number(planeMultiplier) > 0
        ? `${Number(planeMultiplier).toFixed(2)}x`
        : planeStatus == 0 && (
            <div className="waiting-container">
              <div className="more-slot">
                <img src={icon.more} alt="" />
              </div>
              <p
                className="wait"
                style={{ fontWeight: "600", textTransform: "uppercase" }}
              >
                Waiting for the next round
              </p>
              <CountDown />
            </div>
          )}
    </div>
  );
};

export default MultText;
