import { Outlet, useNavigate } from "react-router-dom";

export const UserGuard = () => {
  const navigate = useNavigate();

  const { access, role } = JSON.parse(localStorage.getItem("userData")!);

  if (access !== "granted") {
    navigate("/login");
  }

  return <>{access === "granted" && role === "user" && <Outlet />}</>;
};
