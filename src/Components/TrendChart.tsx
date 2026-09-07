import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { startOfWeek, endOfWeek } from "date-fns";
import { useFetch } from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import { useMessage } from "../Hooks/useMessage";

export const TrendChart = () => {
  const { postRequest } = useFetch();
  const { showMessage, closeMessage } = useMessage();

  const [data, setData] = useState<{ day: string; reports: number }[]>([]);

  const currentSunday = startOfWeek(new Date(), { weekStartsOn: 0 });
  const currentSaturday = endOfWeek(new Date(), { weekStartsOn: 0 });
  // console.log(currentSunday instanceof Date);
  // console.log(currentSunday);
  // console.log(currentSaturday);

  const arrangeDates = (data: any[]) => {
    const arrangedData = [
      { day: "Sun", reports: 0 },
      { day: "Mon", reports: 0 },
      { day: "Tue", reports: 0 },
      { day: "Wed", reports: 0 },
      { day: "Thu", reports: 0 },
      { day: "Fri", reports: 0 },
      { day: "Sat", reports: 0 },
    ];

    for (let dateObj of data) {
      const day = new Date(dateObj.createdAt).getDay();
      arrangedData[day]["reports"] += 1;
    }

    setData(arrangedData);
  };

  const sendDate = async () => {
    const { error, response } = await postRequest({
      route: "/admin/weekly-reports",
      data: { startOfWeek: currentSunday, endOfWeek: currentSaturday },
      type: "object",
    });

    if (error) {
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      arrangeDates(response);
    }
  };

  useEffect(() => {
    sendDate();
    return () => {
      closeMessage();
    };
  }, []);

  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="day" tickMargin={10} />
        <YAxis width={39} />
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
