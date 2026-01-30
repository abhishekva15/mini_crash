import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type GameContextType = {
  openBetModel: boolean;
  setOpenBetModel: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [openBetModel, setOpenBetModel] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("20.00");

  const value: GameContextType = {
    openBetModel,
    setOpenBetModel,
    amount,
    setAmount,
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
