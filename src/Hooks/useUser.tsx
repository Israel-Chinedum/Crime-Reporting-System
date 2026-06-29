import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser should be used within UserProvider!");
  }
  return context;
};
