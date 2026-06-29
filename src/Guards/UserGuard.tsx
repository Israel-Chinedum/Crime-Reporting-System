import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/useUser";
import { useEffect, useState } from "react";

export const UserGuard = () => {
  const { getAccessRights } = useUser();

  const navigate = useNavigate();

  const [user, setUser] = useState<{ access: string; role: string } | null>(
    null,
  );

  const verifyUser = async () => {
    const { access, role } = await getAccessRights();

    if (access) {
      if (access === "denied") {
        navigate("/login");
      } else {
        setUser({ access, role });
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      {user && user.access === "granted" && user.role === "user" && <Outlet />}
    </>
  );
};
