import { Routes } from "react-router-dom";
import { PublicRoutes } from "../Routes/PublicRoutes";
import { PrivateRoutes } from "../Routes/PrivateRoutes";

export const AllPages = () => {
  return (
    <Routes>
      {PublicRoutes()} {PrivateRoutes()}
    </Routes>
  );
};
