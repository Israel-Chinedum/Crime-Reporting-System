import { Routes } from "react-router-dom";
import { PublicRoutes } from "../Routes/PublicRoutes";
import { PrivateRoutes } from "../Routes/PrivateRoutes";
import { MessageProvider } from "../Contexts/MessageContext";
import { UserProvider } from "../Contexts/UserContext";

export const AllPages = () => {
  return (
    <MessageProvider>
      <UserProvider>
        <Routes>
          {PublicRoutes()} {PrivateRoutes()}
        </Routes>
      </UserProvider>
    </MessageProvider>
  );
};
