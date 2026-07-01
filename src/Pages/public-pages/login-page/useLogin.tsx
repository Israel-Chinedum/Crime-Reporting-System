import { useRef } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useMessage } from "../../../Hooks/useMessage";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { postRequest } = useFetch();
  const { showMessage, closeMessage } = useMessage();
  const navigate = useNavigate();

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const postFormData = async () => {
    if (password.current?.value && username.current?.value) {
      // Show pending message
      showMessage({ text: "Logging in...", status: "pending", timeout: null });

      const { response, error } = await postRequest({
        data: {
          username: username.current.value,
          password: password.current.value,
        },
        route: "/user/signin",
        type: "object",
      });

      error && showMessage({ text: error, status: "error" });

      if (response) {
        localStorage.setItem("userData", JSON.stringify(response));
        navigate("/home");
        closeMessage();
      }
    } else {
      showMessage({
        text: "username and password must be provided!",
        status: "warning",
      });
    }
  };

  return { password, username, postFormData };
};
