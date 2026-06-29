import { createContext, useRef, type ReactNode } from "react";
import { useFetch } from "../Hooks/useFetch";
import { useMessage } from "../Hooks/useMessage";

type userType = {
  access: string | null;
  role: "user" | "admin";
};

export const UserContext = createContext<{
  getAccessRights: () => Promise<userType>;
  setAccessRights: (arg: userType) => void;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { getRequest } = useFetch();
  const { showMessage } = useMessage();

  const user = useRef<userType>({ access: null, role: "user" });

  const setAccessRights = ({ access, role }: userType) => {
    user.current = { access, role };
  };

  const getAccessRights = async () => {
    if (!user.current.access || user.current.access === "denied") {
      const { response, error, statusCode } = await getRequest("/auth");
      if (error) {
        if (statusCode === 403 || statusCode === 401) {
          user.current.access = "denied";
        } else {
          showMessage({
            text: error,
            status: "error",
            pos_y: "mid",
            timeout: null,
          });
        }
      }
      if (response) {
        user.current.access = response.access;
        user.current.role = response.role;
      }
    }

    return { access: user.current.access, role: user.current.role };
  };

  return (
    <UserContext value={{ getAccessRights, setAccessRights }}>
      {children}
    </UserContext>
  );
};
