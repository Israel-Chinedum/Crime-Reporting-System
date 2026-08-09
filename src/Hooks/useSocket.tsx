import { useContext } from "react";
import { SocketContext } from "../Contexts/SocketContext";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket muste be used within SocketProvider!");
  const { getSocket } = context;
  const socket = getSocket();
  return socket;
};
