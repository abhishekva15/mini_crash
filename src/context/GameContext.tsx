import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type GameContextType = {
  openBetModel: boolean;
  setOpenBetModel: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  planeMult: number;
  setPlaneMult: React.Dispatch<React.SetStateAction<number>>;
  betPlaced: boolean;
  setBetPlaced: React.Dispatch<React.SetStateAction<boolean>>;
  openRulesModal: boolean;
  setOpenRulesModal: React.Dispatch<React.SetStateAction<boolean>>;
  openGameLimits: boolean;
  setOpenGameLimits: React.Dispatch<React.SetStateAction<boolean>>;
  openBetHistory: boolean;
  setOpenBetHistory: React.Dispatch<React.SetStateAction<boolean>>;
  betClick: number | null;
  setBetClick: React.Dispatch<React.SetStateAction<number | null>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [openBetModel, setOpenBetModel] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("20.00");
  const [planeMult, setPlaneMult] = useState<number>(5);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);
  const [openRulesModal, setOpenRulesModal] = useState<boolean>(false);
  const [openGameLimits, setOpenGameLimits] = useState<boolean>(false);
  const [openBetHistory, setOpenBetHistory] = useState<boolean>(false);
  const [betClick, setBetClick] = useState<number | null>(null);

  const value: GameContextType = {
    openBetModel,
    setOpenBetModel,
    amount,
    setAmount,
    planeMult,
    setPlaneMult,
    betPlaced,
    setBetPlaced,
    openRulesModal,
    setOpenRulesModal,
    openGameLimits,
    setOpenGameLimits,
    openBetHistory,
    setOpenBetHistory,
    betClick,
    setBetClick,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
};
