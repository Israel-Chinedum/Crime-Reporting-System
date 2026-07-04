import { Routes } from "react-router-dom";
import { PublicRoutes } from "../Routes/PublicRoutes";
import { PrivateRoutes } from "../Routes/PrivateRoutes";
import { MessageProvider } from "../Contexts/MessageContext";
import { ReportProvider } from "../Contexts/ReportContext";

export const AllPages = () => {
  return (
    <MessageProvider>
      <ReportProvider>
        <Routes>
          {PublicRoutes()} {PrivateRoutes()}
        </Routes>
      </ReportProvider>
    </MessageProvider>
  );
};
