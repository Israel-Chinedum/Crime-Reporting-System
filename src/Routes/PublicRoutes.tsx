import { Route } from "react-router-dom";
import { LoginPage } from "../Pages/public-pages/login-page/LoginPage";
import { LandingPage } from "../Pages/public-pages/landing-page/LandingPage";
import { Signup } from "../Pages/public-pages/signup-page/Signup";
import { NotFound } from "../Pages/public-pages/404-page/NotFound";
import { AdminLoginPage } from "../Pages/public-pages/login-page/AdminLogin";

export const PublicRoutes = () => {
  return (
    <>
      {/* ====== LANDING PAGE ====== */}
      <Route path="/" element={<LandingPage />} />

      {/* ====== USER LOGIN PAGE ====== */}
      <Route path="/login" element={<LoginPage />} />

      {/* ====== ADMIN LOGIN PAGE ====== */}
      <Route path="/admin-login" element={<AdminLoginPage />} />

      {/* ====== SIGN UP PAGE ====== */}
      <Route path="/signup" element={<Signup />} />

      <Route path="/*" element={<NotFound />} />
    </>
  );
};
