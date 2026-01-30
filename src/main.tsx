import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SocketProvider } from "./context/socket/SocketContext.tsx";
import { GameProvider } from "./context/GameContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </GameProvider>
  </StrictMode>,
);
