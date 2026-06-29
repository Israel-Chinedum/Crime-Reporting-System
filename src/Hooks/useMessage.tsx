import { useContext } from "react";
import { MessageContext } from "../Contexts/MessageContext";

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within MessageProvider!");
  }

  return context;
};
