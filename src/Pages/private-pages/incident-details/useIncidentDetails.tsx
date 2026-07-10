import { useRef } from "react";
import { useReport } from "../../../Hooks/useReport";

export const useIncidentDetails = () => {
  const { setFormData, getReportData } = useReport();
  const reportData = getReportData();

  const form = useRef<HTMLFormElement>(null);

  const setForm = () => {
    form.current && setFormData(form.current);
  };

  return { setForm, form, reportData };
};
