import { Routes } from "react-router-dom";
import { PublicRoutes } from "../Routes/PublicRoutes";
import { PrivateRoutes } from "../Routes/PrivateRoutes";
import { MessageProvider } from "../Contexts/MessageContext";
import { ReportProvider } from "../Contexts/ReportContext";
import { SocketProvider } from "../Contexts/SocketContext";

export const AllPages = () => {
  return (
    <MessageProvider>
      <SocketProvider>
        <ReportProvider>
          <Routes>
            {PublicRoutes()} {PrivateRoutes()}
          </Routes>
        </ReportProvider>
      </SocketProvider>
    </MessageProvider>
  );
};
