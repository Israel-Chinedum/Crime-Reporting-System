import { createContext, useRef, type ReactNode } from "react";

export const ReportContext = createContext<{
  setFormData: (form: HTMLFormElement) => void;
  addFile: (arg: File) => void;
  getReportData: () => any;
  removeFile: () => void;
} | null>(null);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const formData = useRef(new FormData());

  // ====== SET FORM DATA ======
  const setFormData = (form: HTMLFormElement) => {
    const data = new FormData(form);
    formData.current.set("evidence_provided", "false");

    for (let [key, value] of data.entries()) {
      formData.current.set(key, value);
    }
  };

  // ====== GET REPORT DATA ======
  const getReportData = () => {
    const reportData: any = {};
    for (let [key, value] of formData.current.entries()) {
      reportData[key] = value;
    }
    return reportData;
  };

  const addFile = (file: File) => {
    formData.current.set("file", file);
    formData.current.set("evidence_provided", "true");
  };

  const removeFile = () => {
    formData.current.delete("file");
    formData.current.set("evidence_provided", "false");
  };

  return (
    <ReportContext.Provider
      value={{
        setFormData,
        addFile,
        getReportData,
        removeFile,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
