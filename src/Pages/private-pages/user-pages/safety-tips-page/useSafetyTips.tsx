import { useEffect, useState } from "react";
import { useMessage } from "../../../../Hooks/useMessage";
import { useSocket } from "../../../../Hooks/useSocket";

export const useSafetyTips = () => {
  const { showMessage, closeMessage } = useMessage();
  const socket = useSocket();

  const [tips, setTips] = useState<any>([]);

  // ====== GET TIPS ======
  const getTips = () => {
    showMessage({ text: "Getting tips...", status: "pending", timeout: null });
    socket.emit("get-tips", (response: any) => {
      if (response.error) {
        showMessage({ text: response.error, status: "error" });
        return;
      }
      setTips(response);
      closeMessage();
    });
  };

  useEffect(() => {
    getTips();
    return () => {
      closeMessage();
    };
  }, []);

  return { tips };
};
