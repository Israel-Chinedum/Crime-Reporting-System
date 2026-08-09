import { useEffect, useState } from "react";
import { useSocket } from "../../../../Hooks/useSocket";
import { useMessage } from "../../../../Hooks/useMessage";

export const useAdminDashboard = () => {
  const socket = useSocket();
  const { showMessage, closeMessage } = useMessage();

  const [totalReports, setTotalReports] = useState(0);
  const [activeReports, setActiveReports] = useState(0);
  const [resolvedReports, setResolvedReports] = useState(0);
  const [emergencyReports, setEmergencyReports] = useState(0);
  const [recentReports, setRecentReports] = useState<any>(
    "Fetching recent reports...",
  );

  //   ====== GET REPORT COUNT ======
  const getReportCount = () => {
    socket.emit("report-count", (response: any) => {
      if (response.error) {
        showMessage({ text: response.error, status: "error", timeout: 7000 });
        return;
      }

      setTotalReports(response.reportCount);
      setActiveReports(response.activeReportCount);
      setResolvedReports(response.resolvedReportCount);
      setEmergencyReports(response.emergencyReportCount);
    });
  };

  // ====== GET RECENT REPORTS ======
  const getRecentReports = () => {
    socket.emit("recent-reports", (response: any) => {
      if (response.error) {
        setRecentReports("Unable to get recent reports!");
        return;
      }
      setRecentReports(response);
    });
  };

  useEffect(() => {
    getReportCount();
    getRecentReports();
    return () => {
      closeMessage();
    };
  }, []);

  return {
    activeReports,
    resolvedReports,
    totalReports,
    emergencyReports,
    recentReports,
  };
};
