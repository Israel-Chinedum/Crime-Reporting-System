import { createContext, type ReactNode } from "react";
import { io } from "socket.io-client";

let socket: any = null;

const getSocket = () => {
  if (socket) return socket;
  const token = JSON.parse(localStorage.getItem("userData")!)?.refreshToken;
  socket = io("http://localhost:3000", {
    auth: { token },
    withCredentials: true,
  });
  return socket;
};
export const SocketContext = createContext({ getSocket });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SocketContext.Provider value={{ getSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
