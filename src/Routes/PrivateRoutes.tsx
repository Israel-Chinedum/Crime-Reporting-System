import { Route } from "react-router-dom";
import { HomePage } from "../Pages/private-pages/user-pages/home-page/HomePage";
import { IncidentDetails } from "../Pages/private-pages/user-pages/incident-details/IncidentDetails";
import { AddEvidence } from "../Pages/private-pages/user-pages/evidence/AddEvidence";
import { ReviewPage } from "../Pages/private-pages/user-pages/review-page/ReviewPage";
import { ReportStatus } from "../Pages/private-pages/user-pages/report-status-page/ReportStatus";
import { AlertsPage } from "../Pages/private-pages/user-pages/alerts-page/AlertsPage";
import { ProfilePage } from "../Pages/private-pages/user-pages/profile-page/ProfilePage";
import { AdminDashboard } from "../Pages/private-pages/admin-pages/admin-dashboard-page/AdminDashboard";
import { AdminReportsPage } from "../Pages/private-pages/admin-pages/admin-reports-page/AdminReportsPage";
import { AdminAlertsPage } from "../Pages/private-pages/admin-pages/amdin-alerts-page/AdminAlertsPage";
import { AdminSecurityTips } from "../Pages/private-pages/admin-pages/admin-security-tips-page/AdminSecurityTips";
import { AdminGuard } from "../Guards/AdminGuard";
import { UserGuard } from "../Guards/UserGuard";
import { TrackMyReport } from "../Pages/private-pages/user-pages/track-my-report-page/TrackMyReport";
import { SafetyTipsPage } from "../Pages/private-pages/user-pages/safety-tips-page/SafetyTipsPage";
import { AdminSettings } from "../Pages/private-pages/admin-pages/admin-settings-page/AdminSettings";
import { NearbyStationsPage } from "../Pages/private-pages/user-pages/nearby-stations/NearbyStationsPage";

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
        <Route path="/report-status/:reportId" element={<ReportStatus />} />

        {/* ====== ALERTS PAGE ====== */}
        <Route path="/alerts" element={<AlertsPage />} />

        {/* ====== PROFILE PAGE ====== */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* ====== TRACK MY REPORTS PAGE ====== */}
        <Route path="/track-my-reports" element={<TrackMyReport />} />

        {/* ====== SECURITY TIPS PAGE ====== */}
        <Route path="/safety-tips" element={<SafetyTipsPage />} />

        {/* ====== NEARBY STATIONS PAGE ====== */}
        <Route path="/nearby-stations" element={<NearbyStationsPage />} />
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
        <Route path="/admin-security-tips" element={<AdminSecurityTips />} />

        {/* ====== ADMIN SETTINGS PAGE ====== */}
        <Route path="/admin-settings" element={<AdminSettings />} />
      </Route>
    </>
  );
};
