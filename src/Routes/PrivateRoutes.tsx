import { Route } from "react-router-dom";
import { HomePage } from "../Pages/private-pages/home-page/HomePage";
import { IncidentDetails } from "../Pages/private-pages/incident-details/IncidentDetails";
import { AddEvidence } from "../Pages/private-pages/evidence/AddEvidence";
import { ReviewPage } from "../Pages/private-pages/review-page/ReviewPage";
import { ReportStatus } from "../Pages/private-pages/report-status-page/ReportStatus";
import { AlertsPage } from "../Pages/private-pages/alerts-page/AlertsPage";
import { ProfilePage } from "../Pages/private-pages/profile-page/ProfilePage";
import { AdminDashboard } from "../Pages/private-pages/admin-pages/admin-dashboard-page/AdminDashboard";
import { AdminReportsPage } from "../Pages/private-pages/admin-pages/admin-reports-page/AdminReportsPage";
import { AdminAlertsPage } from "../Pages/private-pages/admin-pages/amdin-alerts-page/AdminAlertsPage";
import { AdminMapView } from "../Pages/private-pages/admin-pages/admin-map-view-page/AdminMapView";
import { AdminGuard } from "../Guards/AdminGuard";
import { UserGuard } from "../Guards/UserGuard";

export const PrivateRoutes = () => {
  return (
    <>
      <Route element={<UserGuard />}>
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
      </Route>
      {/* /
      /
      /
      /
      /
      /
      /
      /
      /
      / */}

      {/* ====== ADMIN PAGES ====== */}
      {/* 
      /
      /
      /
      / */}
      <Route element={<AdminGuard />}>
        {/* ====== ADMIN DASHBOARD PAGE ====== */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* ====== ADMIN REPORTS PAGE ====== */}
        <Route path="/admin-reports" element={<AdminReportsPage />} />

        {/* ====== ADMIN ALERTS PAGE ====== */}
        <Route path="/admin-alerts" element={<AdminAlertsPage />} />

        {/* ====== ADMIN MAP VIEW PAGE ====== */}
        <Route path="/admin-map" element={<AdminMapView />} />
      </Route>
    </>
  );
};
