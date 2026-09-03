import { useEffect, useState } from "react";
import { useSocket } from "../../../../Hooks/useSocket";
import { useMessage } from "../../../../Hooks/useMessage";
import { useLoadAnimation } from "../../../../Hooks/useLoadAnimation";

export const useAdminSecurityTips = () => {
  const { showMessage, closeMessage } = useMessage();
  const socket = useSocket();
  const { loadAnimation, setLoadAnimation, runLoadAnimation } =
    useLoadAnimation();

  const [tips, setTips] = useState<any>([]);
  const [tipToEdit, setTipToEdit] = useState<{
    edit: boolean;
    tipTitle?: string;
  }>({ edit: false });

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

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

  // ====== SAVE TIP ======
  const saveTip = () => {
    if (!title) {
      showMessage({ text: "Title must not be empty!", status: "warning" });
      return;
    } else if (!message) {
      showMessage({
        text: "Message field must not be empty!",
        status: "warning",
      });
      return;
    }
    setLoadAnimation({ state: true, message: "Saving tip..." });
    socket.emit(
      "save-tip",
      { title: title, message: message },
      (response: any) => {
        if (response.error) {
          setLoadAnimation({ state: false });
          showMessage({ text: response.error, status: "error" });
          return;
        }

        setTips(response.data);
        setLoadAnimation({ state: false });
        showMessage({ text: response.message, status: "success" });
      },
    );
  };

  // ====== UPDATE TIP ======
  const updateTip = () => {
    if (!title) {
      showMessage({ text: "Title must not be empty!", status: "warning" });
      return;
    } else if (!message) {
      showMessage({
        text: "Message field must not be empty!",
        status: "warning",
      });
      return;
    }

    setLoadAnimation({ state: true, message: "Updating tip..." });
    socket.emit(
      "update-tip",
      { newTitle: title, title: tipToEdit.tipTitle, message: message },
      (response: any) => {
        if (response.error) {
          setLoadAnimation({ state: false, message: "" });
          showMessage({ text: response.error, status: "error" });
          return;
        }

        setLoadAnimation({ state: false, message: "" });
        showMessage({ text: response.message, status: "success" });
        setTips(response.tips);
        setTipToEdit({ edit: false });
      },
    );
  };

  useEffect(() => {
    getTips();
    return () => {
      closeMessage();
    };
  }, []);

  return {
    saveTip,
    tips,
    title,
    setTitle,
    message,
    setMessage,
    loadAnimation,
    runLoadAnimation,
    tipToEdit,
    setTipToEdit,
    updateTip,
  };
};
