import { Routes } from "react-router-dom";
import { PublicRoutes } from "../Routes/PublicRoutes";
import { PrivateRoutes } from "../Routes/PrivateRoutes";
import { MessageProvider } from "../Contexts/MessageContext";

export const AllPages = () => {
  return (
    <MessageProvider>
      <Routes>
        {PublicRoutes()} {PrivateRoutes()}
      </Routes>
    </MessageProvider>
  );
};
