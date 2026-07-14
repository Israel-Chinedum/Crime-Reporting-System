import { Outlet } from "react-router-dom";
import { LoginPage } from "../Pages/public-pages/login-page/LoginPage";

export const UserGuard = () => {
  const userData = JSON.parse(localStorage.getItem("userData")!);

  if (!userData || userData.access !== "granted" || userData.role !== "user") {
    return <LoginPage />;
  } else {
    return <Outlet />;
  }
};
