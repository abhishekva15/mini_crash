import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import Canvas from "../components/canvas/canvas";
import LeftPart from "../components/leftPart/LeftPart";
import { useSocketContext } from "../context/socket/SocketContext";
import type { MaxOddsData } from "../types/socketType";

const Home: React.FC = () => {
  const { planeData, maxOdds } = useSocketContext();
  const parsedBetData = planeData?.split(":") ?? [];
  const planeMutiplier = parsedBetData.length >= 2 ? parsedBetData[1] : "0";

  const [animateAll, setAnimateAll] = useState(false);
  const prevMaxOddsRef = useRef<MaxOddsData[]>([]);

  useEffect(() => {
    const prev = prevMaxOddsRef.current;
    const changed = JSON.stringify(prev) !== JSON.stringify(maxOdds);

    if (changed && maxOdds.length > 0) {
      setAnimateAll(true);
      setTimeout(() => setAnimateAll(false), 600);
    }

    prevMaxOddsRef.current = maxOdds;
  }, [maxOdds]);

  return (
    <>
      <div className="main-container">
        <div className="game-inner-body">
          <div className="game-body">
            <Header />
            <div className="game_section">
              <div className="left_bet_panel">
                <LeftPart />
              </div>
              <div className="right_canvas">
                <div className="max_odds">
                  {maxOdds?.map((el, i) => (
                    <div
                      key={i}
                      className={`max-odd ${animateAll && i === 0 ? "slide-in-zoom" : ""}`}
                      style={{
                        color:
                          Number(el.round_max_mult) > 10
                            ? "#C017B4"
                            : Number(el.round_max_mult) >= 2
                              ? "#913EF8"
                              : "#34B4FF",
                        fontWeight: "700",
                        opacity: i === 0 || i === 1 ? 1 : undefined,
                      }}
                      // onClick={() => handleRoundModal(el)}
                    >
                      {el?.round_max_mult}x
                    </div>
                  ))}
                </div>
                <div className="canvas_section">
                  <Canvas
                    planeMultiplier={planeMutiplier}
                    planeData={planeData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
