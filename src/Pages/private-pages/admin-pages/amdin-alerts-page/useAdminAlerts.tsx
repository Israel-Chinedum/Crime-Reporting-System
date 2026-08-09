import { useEffect, useState } from "react";
import { useMessage } from "../../../../Hooks/useMessage";
import { useSocket } from "../../../../Hooks/useSocket";

export const useAdminAlerts = () => {
  const socket = useSocket();
  const { showMessage, closeMessage } = useMessage();

  const [alerts, setAlerts] = useState<any[]>([]);

  const getAlerts = () => {
    showMessage({
      text: "Getting alerts...",
      status: "pending",
      timeout: null,
    });
    socket.emit("alerts", (response: any) => {
      if (response.error) {
        showMessage({ text: response.error, status: "error", timeout: 7000 });
        return;
      }
      setAlerts(response);
      closeMessage();
    });
  };

  useEffect(() => {
    getAlerts();
    return () => {
      closeMessage();
    };
  }, []);

  return { alerts };
};
