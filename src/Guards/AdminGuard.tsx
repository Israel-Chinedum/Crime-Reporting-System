import { Outlet } from "react-router-dom";
import { LandingPage } from "../Pages/public-pages/landing-page/LandingPage";

export const AdminGuard = () => {
  const userData = JSON.parse(localStorage.getItem("userData")!);

  if (!userData || userData.access !== "granted" || userData.role !== "admin") {
    return <LandingPage />;
  } else {
    return <Outlet />;
  }
};
