import { useEffect, useState } from "react";
import { useSocket } from "../../../../Hooks/useSocket";
import { useMessage } from "../../../../Hooks/useMessage";

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

      const sortedResponse = response.sort((a: any, b: any) => {
        const numA = new Date(a.createdAt).getTime();
        const numB = new Date(b.createdAt).getTime();
        return numB - numA;
      });

      setNotifications(sortedResponse);
      closeMessage();
    });
  };

  useEffect(() => {
    socket.on("notification", (data: any) => {
      setNotifications(
        data.sort((a: any, b: any) => {
          const numA = new Date(a.createdAt).getTime();
          const numB = new Date(b.createdAt).getTime();
          return numB - numA;
        }),
      );
    });

    getNotifications();

    return () => {
      socket.off("notification");
      closeMessage();
    };
  }, []);

  return { notifications };
};
