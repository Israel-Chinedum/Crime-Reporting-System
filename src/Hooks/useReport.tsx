import { useContext } from "react";
import { ReportContext } from "../Contexts/ReportContext";

export const useReport = () => {
  const context = useContext(ReportContext);

  if (!context)
    throw new Error("useReport should be used within ReportProvider!");
  return context;
};
