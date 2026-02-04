import React, { useEffect, useState } from "react";

interface NetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  readonly rtt: number;
  addEventListener(type: "change", listener: () => void): void;
  removeEventListener(type: "change", listener: () => void): void;
}

// Add this declaration
declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

const Network: React.FC = () => {
  const [isSlowNetwork, setIsSlowNetwork] = useState<boolean>(false);

  const checkNetworkSpeed = () => {
    const connection = navigator.connection;
    if (connection) {
      const { effectiveType, downlink, rtt } = connection;
      const isReallySlow =
        effectiveType === "2g" || downlink < 0.3 || rtt > 300;

      setIsSlowNetwork(isReallySlow);
    }
  };

  useEffect(() => {
    const connection = navigator.connection;

    checkNetworkSpeed(); // Initial check

    if (connection) {
      connection.addEventListener("change", checkNetworkSpeed);

      return () => {
        connection.removeEventListener("change", checkNetworkSpeed);
      };
    }
  }, []);

  useEffect(() => {
    if (isSlowNetwork) {
      const timer = setTimeout(() => {
        setIsSlowNetwork(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSlowNetwork]);

  return (
    <>
      {isSlowNetwork && (
        <div className="toast-center">
          <div className="toast-container red-toast">
            Low Internet Connection
          </div>
        </div>
      )}
    </>
  );
};

export default Network;
