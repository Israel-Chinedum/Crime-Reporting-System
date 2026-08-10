import { useEffect, useState } from "react";
import { useSocket } from "../../../Hooks/useSocket";
import { useMessage } from "../../../Hooks/useMessage";

export const useNotificationsPage = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { showMessage, closeMessage } = useMessage();
  const socket = useSocket();

  const getNotifications = () => {
    showMessage({
      text: "Fetching notifications...",
      status: "pending",
      timeout: null,
    });
    socket.emit("notification", (response: any) => {
      if (response.error) {
        showMessage({ text: response.error, status: "error" });
        return;
      }
      setNotifications(response);
      closeMessage();
    });
  };

  useEffect(() => {
    socket.on("notification", (data: any) => {
      setNotifications((prev) => [data, ...prev]);
    });

    getNotifications();

    return () => {
      socket.off("notification");
      closeMessage();
    };
  }, []);

  return { notifications };
};
