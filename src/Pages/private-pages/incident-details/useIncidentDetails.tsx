import { useRef } from "react";
import { useReport } from "../../../Hooks/useReport";

export const useIncidentDetails = () => {
  const { setFormData } = useReport();

  const form = useRef<HTMLFormElement>(null);

  const setForm = () => {
    form.current && setFormData(form.current);
  };

  return { setForm, form };
};
