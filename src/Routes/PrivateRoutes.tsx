import { Route } from "react-router-dom";
import { HomePage } from "../Pages/private-pages/home-page/HomePage";
import { IncidentDetails } from "../Pages/private-pages/incident-details/IncidentDetails";
import { AddEvidence } from "../Pages/private-pages/evidence/AddEvidence";
import { ReviewPage } from "../Pages/private-pages/review-page/ReviewPage";
import { ReportStatus } from "../Pages/private-pages/report-status-page/ReportStatus";
import { AlertsPage } from "../Pages/private-pages/alerts-page/AlertsPage";
import { ProfilePage } from "../Pages/private-pages/profile-page/ProfilePage";
import { AdminDashboard } from "../Pages/private-pages/admin-pages/dashboard-page/AdminDashboard";

export const PrivateRoutes = () => {
  return (
    <>
      {/* ====== HOME PAGE ====== */}
      <Route path="/home" element={<HomePage />} />

      {/* ====== INCIDENT DETAILS PAGE ====== */}
      <Route path="/incident-details" element={<IncidentDetails />} />

      {/* ====== ADD EVEDENCE PAGE ======  */}
      <Route path="/evidence" element={<AddEvidence />} />

      {/* ====== REVIEW AND CONFIRM PAGE ====== */}
      <Route path="/review" element={<ReviewPage />} />

      {/* ====== REPORT STATUS PAGE ====== */}
      <Route path="/report-status" element={<ReportStatus />} />

      {/* ====== ALERTS PAGE ====== */}
      <Route path="/alerts" element={<AlertsPage />} />

      {/* ====== PROFILE PAGE ====== */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* ====== ADMIN DASHBOARD PAGE ====== */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </>
  );
};
