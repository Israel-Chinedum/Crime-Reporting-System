import { useEffect, useState } from "react";
import { useFetch } from "../../../../Hooks/useFetch";
import { useMessage } from "../../../../Hooks/useMessage";

export const useTrackMyReport = () => {
  const { showMessage, closeMessage } = useMessage();
  const [myReports, setMyReports] = useState<any>([]);
  const { getRequest } = useFetch();

  const getUserReports = async () => {
    showMessage({
      text: "Fetching your reports...",
      status: "pending",
      timeout: null,
    });
    const { response, error } = await getRequest("/report");
    if (error) {
      showMessage({ text: error, status: "error" });
    }
    if (response) {
      setMyReports(response);
      closeMessage();
    }
  };

  useEffect(() => {
    getUserReports();
  }, []);

  return { myReports };
};
