import { useRef } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useMessage } from "../../../Hooks/useMessage";
import { useNavigate } from "react-router-dom";
import { useLoadAnimation } from "../../../Hooks/useLoadAnimation";

export const useLogin = () => {
  const { postRequest } = useFetch();
  const { showMessage, closeMessage, getUserChoice } = useMessage();
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
        route: "/user/signin",
        type: "object",
      });

      if (error) {
        setLoadAnimation({ state: false });
        showMessage({ text: error, status: "error" });
      }

      if (response) {
        setLoadAnimation({ state: false });
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

  const forgotPassword = async () => {
    showMessage({
      text: "Enter your registered email",
      status: "normal",
      customRes: true,
    });

    const email = await getUserChoice();

    setLoadAnimation({ state: true, message: "Sending OTP..." });

    const { error, response } = await postRequest({
      route: "/user/send-otp",
      data: { email },
      type: "object",
    });

    if (error) {
      setLoadAnimation({ state: false });
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      setLoadAnimation({ state: false });

      showMessage({
        text: "An OTP was just sent to your email address please enter it below",
        status: "normal",
        customRes: true,
      });

      const otp = await getUserChoice();

      if (response) {
        showMessage({
          text: "Enter new password",
          status: "normal",
          customRes: true,
        });

        const password = await getUserChoice();

        setLoadAnimation({ state: true, message: "Updating user password..." });

        const { error, response } = await postRequest({
          route: "/user/update-password",
          data: { email, otp, password },
          type: "object",
        });

        if (error) {
          setLoadAnimation({ state: false });
          showMessage({ text: error, status: "error" });
        }

        if (response) {
          setLoadAnimation({ state: false });
          showMessage({ text: response.message, status: "success" });
        }
      }
    }
  };

  return {
    password,
    username,
    postFormData,
    loadAnimation,
    runLoadAnimation,
    forgotPassword,
  };
};
