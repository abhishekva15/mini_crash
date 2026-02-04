import React, { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/socket/SocketContext";
import type { MaxOddsData } from "../../types/socketType";

const MaxOdds: React.FC = () => {
  const { maxOdds } = useSocketContext();
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
  );
};

export default MaxOdds;
