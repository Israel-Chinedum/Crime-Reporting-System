import { createContext, useRef, type ReactNode } from "react";

export const ReportContext = createContext<{
  setFormData: (form: HTMLFormElement) => void;
  formData: FormData;
} | null>(null);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const formData = useRef(new FormData());

  const setFormData = (form: HTMLFormElement) => {
    const data = new FormData(form);

    for (let [key, value] of data.entries()) {
      formData.current.append(key, value);
    }
  };

  return (
    <ReportContext.Provider value={{ setFormData, formData: formData.current }}>
      {children}
    </ReportContext.Provider>
  );
};
