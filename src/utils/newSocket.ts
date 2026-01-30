import { io } from "socket.io-client";

const URL = import.meta.env.VITE_APP_BASE_SOCKET_URL;

export const createSocket = (token: string, gameId: string) => {
  return io(URL, {
    transports: ["websocket"],
    query: {
      game_id: gameId,
      token,
    },
  });
};
