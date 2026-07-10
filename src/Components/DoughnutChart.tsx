import { PieChart, Pie, ResponsiveContainer } from "recharts";

export const DoughnutChart = () => {
  const data = [
    {
      name: "Active",
      value: 36 ,
      fill: "#f39c12",
    },
    {
      name: "Resolved",
      value: 92,
      fill: "#1447e6",
    },
    {
      name: "Emergency",
      value: 7,
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
