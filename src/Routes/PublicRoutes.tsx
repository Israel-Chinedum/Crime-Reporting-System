import { Route } from "react-router-dom";
import { LoginPage } from "../Pages/public-pages/login-page/LoginPage";
import { LandingPage } from "../Pages/public-pages/landing-page/LandingPage";
import { Signup } from "../Pages/public-pages/signup-page/Signup";
// import { useReportBox } from "../Components/ReportBox";

export const PublicRoutes = () => {
  return (
    <>
      {/* ====== LANDING PAGE ====== */}
      <Route path="/" element={<LandingPage />} />

      {/* ====== LOGIN PAGE ====== */}
      <Route path="/login" element={<LoginPage />} />

      {/* ====== SIGN UP PAGE ====== */}
      <Route path="/signup" element={<Signup />} />

      {/* <Route path="/test" element={<useReportBox />} /> */}
    </>
  );
};
