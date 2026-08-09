import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { useAdminDashboard } from "../Pages/private-pages/admin-pages/admin-dashboard-page/useAdminDashboard";

export const DoughnutChart = () => {
  const { activeReports, resolvedReports, emergencyReports } =
    useAdminDashboard();

  const data = [
    {
      name: "Active",
      value: activeReports,
      fill: "#f39c12",
    },
    {
      name: "Resolved",
      value: resolvedReports,
      fill: "#1447e6",
    },
    {
      name: "Emergency",
      value: emergencyReports,
      fill: "#e63946",
    },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <PieChart>
        <Pie
          data={data}
          strokeWidth={0}
          dataKey={"value"}
          innerRadius={85}
          outerRadius={120}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
