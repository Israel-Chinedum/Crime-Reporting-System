import { useRef } from "react";
import { useMessage } from "../../../Hooks/useMessage";
import { useFetch } from "../../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const { showMessage } = useMessage();
  const { postRequest } = useFetch();
  const navigate = useNavigate();

  const form = useRef<HTMLFormElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const match = (a: string, b: string) => {
    return a === b ? true : false;
  };

  const postFormData = () => {
    if (form.current) {
      form.current.onsubmit = async (e) => {
        e.preventDefault();

        if (password.current && confirmPassword.current) {
          const passwordsMatch = match(
            password.current.value,
            confirmPassword.current?.value,
          );
          if (!passwordsMatch) {
            showMessage({ text: "Passwords do not match!", status: "warning" });
            return;
          }
        }

        if (form.current) {
          showMessage({ text: "Pending...", status: "pending", timeout: null });
          const { response, error } = await postRequest({
            data: form.current,
            route: "/user",
            type: "formElement",
          });

          error && showMessage({ text: error, status: "error" });

          if (response) {
            form.current.style.display = "none";

            showMessage({
              text: response.message,
              status: "success",
              pos_y: "mid",
            });
            showMessage({
              text: "Redirecting to login page",
              status: "pending",
              delay: 3000,
              timeout: 6000,
              pos_y: "mid",
              noBorder: true,
            });
            setTimeout(() => {
              navigate("/login");
            }, 6000);
          }
        }
      };
    }
  };

  return { form, password, confirmPassword, postFormData };
};
