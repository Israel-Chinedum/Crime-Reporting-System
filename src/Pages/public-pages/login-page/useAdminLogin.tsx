import { useRef } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useMessage } from "../../../Hooks/useMessage";
import { useNavigate } from "react-router-dom";
import { useLoadAnimation } from "../../../Hooks/useLoadAnimation";

export const useAdminLogin = () => {
  const { postRequest } = useFetch();
  const { showMessage, closeMessage } = useMessage();
  const navigate = useNavigate();
  const { loadAnimation, runLoadAnimation, setLoadAnimation } =
    useLoadAnimation();

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const postFormData = async () => {
    if (password.current?.value && username.current?.value) {
      // Show load animation
      setLoadAnimation({ state: true, message: "Loggin in..." });

      const { response, error } = await postRequest({
        data: {
          username: username.current.value,
          password: password.current.value,
        },
        route: "/admin/signin",
        type: "object",
      });

      if (error) {
        setLoadAnimation({ state: false });
        showMessage({ text: error, status: "error" });
      }

      if (response) {
        setLoadAnimation({ state: false });
        localStorage.setItem("userData", JSON.stringify(response));
        navigate("/admin-dashboard");
        closeMessage();
      }
    } else {
      showMessage({
        text: "username and password must be provided!",
        status: "warning",
      });
    }
  };

  return { password, username, postFormData, loadAnimation, runLoadAnimation };
};
