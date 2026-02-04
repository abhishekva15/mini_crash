import React, { useEffect, useState } from "react";
import "./model.css";
import { icon } from "../utils/icon";
import { useSocketContext } from "../context/socket/SocketContext";
import { categoryCheck, chipNumber } from "../utils/helper";
import { getCaller } from "../utils/api";
import { useGameContext } from "../context/GameContext";

const BetHistory: React.FC = () => {
  const { setOpenBetHistory, openBetHistory } = useGameContext();
  const { info } = useSocketContext();
  const [myBetData, setMyBetData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const handleMyBet = async () => {
    setLoading(true);
    try {
      const res = await getCaller(
        `bet-history?user_id=${info?.id}&operator_id=${info?.operator_id}&limit=10`,
      );
      const newMyBet = res?.data;
      setMyBetData(newMyBet);
    } catch (error) {
      console.error("Failed to fetch bet history", error);
      setMyBetData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMyBet();
  }, [openBetHistory]);

  return (
    <div className="modal-backdrop-history" style={{ zIndex: "1000" }}>
      <div className="bet_history_model">
        <div className="bet_history_hrader">
          Bet History
          <img
            src={icon?.crossIcon}
            alt=""
            className="cross_icon"
            onClick={() => setOpenBetHistory(false)}
          />
        </div>
        <div className="middle-content">
          <table>
            <thead>
              <tr style={{ position: "sticky" }}>
                <th>Round Id</th>
                <th style={{ width: "30%" }}>Bet On</th>
                <th>Odds</th>
                <th>Stake</th>
                <th>P/L</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ height: "80px", textAlign: "center" }}
                  >
                    <span className="loader"></span>
                  </td>
                </tr>
              ) : myBetData?.length > 0 ? (
                myBetData?.map((data: any, index: number) => (
                  <tr
                    key={index}
                    className={`${index % 2 == 0 ? "odd_color" : ""}`}
                  >
                    <td>{data?.lobby_id}</td>
                    <td>{`${chipNumber(data?.chip, data?.cat)} (${categoryCheck(
                      data?.chip,
                    )})`}</td>
                    <td>{data?.mult}</td>
                    <td>{data?.betAmount}</td>
                    <td>{data?.["p/l"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{ height: "80px", textAlign: "center" }}
                  >
                    No History Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BetHistory;
