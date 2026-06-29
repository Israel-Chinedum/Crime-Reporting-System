import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const TrendChart = () => {
  const data = [
    { day: "Mon", reports: 10 },
    { day: "Tue", reports: 15 },
    { day: "Wed", reports: 25 },
    { day: "Thu", reports: 22 },
    { day: "Fri", reports: 18 },
    { day: "Sat", reports: 16 },
    { day: "Sun", reports: 13 },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="day" tickMargin={10} />
        <YAxis width={24} />
        <Tooltip />
        <Area
          type={"monotone"}
          dataKey={"reports"}
          stroke="#6366f1"
          strokeWidth={2}
          fill="#6366f1"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
