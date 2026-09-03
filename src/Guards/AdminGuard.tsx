import { Outlet } from "react-router-dom";
import { AdminLoginPage } from "../Pages/public-pages/login-page/AdminLogin";

export const AdminGuard = () => {
  const userData = JSON.parse(localStorage.getItem("userData")!);

  if (!userData || userData.access !== "granted" || userData.role !== "admin") {
    return <AdminLoginPage />;
  } else {
    return <Outlet />;
  }
};
