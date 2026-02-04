import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Socket } from "socket.io-client";
import {
  type GameStatus,
  type Info,
  type MaxOddsData,
} from "../../types/socketType";
import { createSocket } from "../../utils/newSocket";

interface SocketContextProps {
  info: Info;
  socketConnected: boolean;
  socket: Socket | null;
  token: string;
  planeData: string;
  maxOdds: MaxOddsData[];
  betPlaceSucc: boolean;
  setBetPlaceSucc: React.Dispatch<React.SetStateAction<boolean>>;
  errorText: string;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  errorModel: boolean;
  setErrorModel: React.Dispatch<React.SetStateAction<boolean>>;
  settlementData: any | null;
  winPopup: boolean;
  setWinPopup: React.Dispatch<React.SetStateAction<boolean>>;
  betData: GameStatus[];
}

export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined,
);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const rawQuery = window.location.search.substring(1);
  const decodedQuery = decodeURIComponent(rawQuery);

  const [info, setInfo] = useState<Info>({
    user_id: "",
    image: "",
    balance: "",
    operator_id: "",
  });
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token, setToken] = useState<string>("");
  const [planeData, setPlaneData] = useState<string>("");
  const [maxOdds, setMaxOdds] = useState<MaxOddsData[]>([]);
  const [betPlaceSucc, setBetPlaceSucc] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [errorModel, setErrorModel] = useState<boolean>(false);
  const [settlementData, setSettlementData] = useState<any | null>(null);
  const [winPopup, setWinPopup] = useState<boolean>(false);
  const [betData, setBetData] = useState<GameStatus[]>([]);

  let queryParams: { [key: string]: string } = {};
  try {
    queryParams = JSON.parse(
      '{"' + decodedQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      },
    );
  } catch (e) {
    queryParams = {};
  }

  useEffect(() => {
    if (queryParams.id) {
      const socketInstance = createSocket(queryParams.id, queryParams.game_id);
      setSocket(socketInstance);
      setToken(queryParams.id);

      socketInstance.on("connect", () => {
        setSocketConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setSocketConnected(false);
      });

      socketInstance.on("info", (data: Info) => {
        setInfo(data);
      });

      socketInstance.on("plane", (data: string) => {
        setPlaneData(data);
      });

      socketInstance.on("maxOdds", (data: MaxOddsData[]) => {
        try {
          if (data) {
            setMaxOdds(data);
          }
        } catch (err) {
          console.error("Error setting maxOdds:", err);
        }
      });

      socketInstance.on("betError", (data: string) => {
        setErrorText(data);
        setErrorModel(true);
      });

      socketInstance.on("bet", (data: string) => {
        if (data) {
          setBetPlaceSucc(true);
        }
      });

      socketInstance.on("settlement", (data: any) => {
        setSettlementData(data);
        setWinPopup(true);
      });

      socketInstance.on("game_status", (data: string) => {
        const gameStatus: GameStatus[] = JSON.parse(data);
        console.log(gameStatus);
        setBetData(gameStatus);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [queryParams.id]);

  const value: SocketContextProps = {
    info,
    socketConnected,
    socket,
    token,
    planeData,
    maxOdds,
    betPlaceSucc,
    setBetPlaceSucc,
    errorText,
    setErrorText,
    errorModel,
    setErrorModel,
    settlementData,
    winPopup,
    setWinPopup,
    betData,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within SocketProvider");
  }
  return context;
};
