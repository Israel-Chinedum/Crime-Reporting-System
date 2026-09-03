import { useEffect, useState } from "react";
import { useFetch } from "../../../../Hooks/useFetch";
import { useMessage } from "../../../../Hooks/useMessage";
import { useNavigate } from "react-router-dom";

export const useAdminSettings = () => {
  const { getRequest, postRequest } = useFetch();
  const { showMessage, closeMessage, getUserChoice } = useMessage();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //  ====== GET ADMIN DATA ======
  const getAdminData = async () => {
    showMessage({
      text: "Fetching admin information...",
      status: "pending",
      timeout: null,
    });

    const { error, response } = await getRequest("/admin/get-admin-data");

    if (error) {
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      setUsername(response?.username);
      closeMessage();
    }
  };

  //   ====== UPDATE ADMIN USERNAME ======
  const updateAdminUsername = async () => {
    showMessage({
      text: "Enter password",
      status: "normal",
      customRes: true,
    });

    const password = await getUserChoice();

    showMessage({
      text: "Updating username...",
      status: "pending",
      timeout: null,
    });

    const { error, response } = await postRequest({
      route: "/admin/update-username",
      data: { username: newUsername, password },
      type: "object",
    });

    if (error) {
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      showMessage({ text: response.message, status: "success" });

      const userData = JSON.parse(localStorage.getItem("userData")!);
      userData["accessToken"] = response.accessToken;
      localStorage.setItem("userData", JSON.stringify(userData));

      setUsername(response.data);
      setNewUsername("");
    }
  };

  // ====== UPDATE ADMIN PASSWORD ======
  const updateAdminPassword = async () => {
    showMessage({
      text: "Updating password...",
      status: "pending",
      timeout: null,
    });

    if (newPassword !== confirmPassword) {
      showMessage({ text: "Passwords do not match!", status: "warning" });
      return;
    }

    const { error, response } = await postRequest({
      route: "/admin/update-password",
      data: { currentPassword, newPassword },
      type: "object",
    });

    if (error) {
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      showMessage({ text: response.message, status: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/admin-login");
  };

  useEffect(() => {
    getAdminData();

    return () => {
      closeMessage();
    };
  }, []);

  return {
    username,
    setNewUsername,
    newUsername,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    currentPassword,
    setCurrentPassword,
    updateAdminUsername,
    updateAdminPassword,
    logout,
  };
};
