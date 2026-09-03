import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { cn } from "../../../../utilities/classNames";
import { FaCalendar, FaCheck } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { DoughnutChart } from "../../../../Components/DoughnutChart";
import { TrendChart } from "../../../../Components/TrendChart";
import { useAdminDashboard } from "./useAdminDashboard";

export const AdminDashboard = () => {
  const {
    activeReports,
    totalReports,
    resolvedReports,
    emergencyReports,
    recentReports,
  } = useAdminDashboard();

  return (
    <div className={cn("flex")}>
      <AdminSideBar active="dashboard" />
      <section
        className={cn(
          "text-custom-white w-full h-dvh  overflow-y-auto p-3 relative",
        )}
      >
        <div
          className={cn(
            "bg-[url('/fpog-logo.png')] bg-no-repeat  bg-center",
            "absolute w-full h-full inset-0 z-[-1] opacity-20",
          )}
        ></div>
        <div>
          <div className={cn("flex items-center justify-between")}>
            <h1>Dashboard Overview</h1>
            <div className={cn("flex items-center gap-4")}>
              <div
                className={cn(
                  "flex items-center gap-4 bg-deep p-2 h-max w-max rounded-md",
                )}
              >
                <p>May 21, 2026</p>
                <FaCalendar />
              </div>
              <div className={cn("w-15 h-15 rounded-full bg-deep")}></div>
            </div>
          </div>
        </div>
        <h1 className={cn("text-2xl")}>Welcome back, Admin Officer 👋</h1>
        <p>Here's what's happening today.</p>
        {/* 
/
/
/
/
/
/
/
/
/
/
        */}

        {/* ====== CARDS ====== */}
        <div
          className={cn(
            "gap-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
            "mt-5",
          )}
        >
          {/* ====== TOTAL REPORTS CARD ====== */}
          <div
            className={cn(
              "bg-deep p-3 rounded-md flex flex-col gap-4 shadow-xl",
            )}
          >
            <p className={cn("text-xl text-blue-600")}>Total Reports</p>
            <p className={cn("text-4xl font-bold text-blue-600")}>
              {totalReports}
            </p>
            <p className={cn("flex gap-1")}>
              <span className={cn("flex gap-1 items-center text-custom-green")}>
                <FaArrowUp />
              </span>{" "}
              Tracked
            </p>
          </div>

          {/* ====== ACTIVE REPORTS CARD ====== */}
          <div
            className={cn(
              "bg-deep p-3 rounded-md flex flex-col gap-4 shadow-xl",
            )}
          >
            <p className={cn("text-xl text-custom-orange")}>Active Reports</p>
            <p className={cn("text-4xl font-bold text-custom-orange")}>
              {activeReports}
            </p>
            <p className={cn("flex gap-1")}>
              <span
                className={cn("flex gap-1 items-center text-custom-orange")}
              >
                <FaBarsProgress />
              </span>{" "}
              In progress
            </p>
          </div>

          {/* ====== RESOLVED REPORTS CARD ====== */}
          <div
            className={cn(
              "bg-deep p-3 rounded-md flex flex-col gap-4 shadow-xl",
            )}
          >
            <p className={cn("text-xl text-custom-green")}>Resolved Reports</p>
            <p className={cn("text-4xl font-bold text-custom-green")}>
              {resolvedReports}
            </p>
            <p className={cn("flex gap-1")}>
              <span className={cn("flex gap-1 items-center text-custom-green")}>
                <FaCheck />
              </span>{" "}
              Closed
            </p>
          </div>

          {/* ====== TOTAL EMERGENCY ALERTS CARD ====== */}
          <div
            className={cn(
              "bg-deep p-3 rounded-md flex flex-col gap-4 shadow-xl",
            )}
          >
            <p className={cn("text-xl text-accent")}>Emergency Alerts</p>
            <p className={cn("text-4xl font-bold text-accent")}>
              {emergencyReports}
            </p>
            <p className={cn("text-accent")}>High priority</p>
          </div>
        </div>
        {/* 
/
/
/
/
/
/
/
/
/
/       */}

        {/* ====== CHARTS ====== */}
        <div
          className={cn(
            "mt-10 grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-5",
          )}
        >
          {/* ====== DOUGHNUT CHART ====== */}
          <div className={cn("bg-deep w py-4 px-6 rounded-xl shadow-xl")}>
            <h1 className={cn("mb-5 text-xl font-bold")}>Reports by Status</h1>
            <div className={cn("flex items-center gap-8")}>
              {/* ====== Chart ====== */}
              <div className={cn("w-60 relative no-svg-outline")}>
                <h1
                  className={cn(
                    "absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]",
                    "flex flex-col items-center justify-center",
                  )}
                >
                  <span className={cn("text-4xl font-bold")}>
                    {activeReports}
                  </span>{" "}
                  <span className={cn("text-2xl")}>Active</span>
                </h1>
                <DoughnutChart />
              </div>

              {/* ====== Chart info ====== */}
              <div className={cn("w-50 flex flex-col gap-4")}>
                {/* ====== Resolved ====== */}
                <div className={cn("flex justify-between")}>
                  <div className={cn("flex gap-2")}>
                    <div
                      id="ball"
                      className={cn("w-5 h-5 bg-blue-600 rounded-full")}
                    ></div>
                    <h1>Resolved</h1>
                  </div>
                  <p>{resolvedReports}</p>
                </div>

                {/* ====== In progress ====== */}
                <div className={cn("flex justify-between")}>
                  <div className={cn("flex gap-2")}>
                    <div
                      id="ball"
                      className={cn("w-5 h-5 bg-orange-400 rounded-full")}
                    ></div>
                    <h1>In Progress</h1>
                  </div>
                  <p>{activeReports}</p>
                </div>

                {/* ====== Emergency ====== */}
                <div className={cn("flex justify-between")}>
                  <div className={cn("flex gap-2")}>
                    <div
                      id="ball"
                      className={cn("w-5 h-5 bg-accent rounded-full")}
                    ></div>
                    <h1>Emergency</h1>
                  </div>
                  <p>{emergencyReports}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== LINE CHART ====== */}
          <div className={cn("bg-deep py-4 px-6 rounded-xl shadow-xl")}>
            <h1 className={cn("text-xl font-bold mb-5")}>
              Reports by Trend (This Week)
            </h1>
            <div className={cn("no-svg-outline")}>
              <TrendChart />
            </div>
          </div>
        </div>
        {/* 
/
/
/
/
/
/
/
/
/
/       */}

        {/* ====== RECENT REPORTS ====== */}
        <div className={cn("mt-10 mb-5 bg-deep p-3 rounded-xl shadow-xl")}>
          <div className={cn("mb-4 flex items-center justify-between")}>
            <h1 className={cn("text-xl font-bold")}>Recent Reports</h1>
            <p className={cn("text-blue-600 cursor-pointer")}>
              View All Reports
            </p>
          </div>
          <table className={cn("w-full")}>
            {/* ====== table head ====== */}
            <thead className={cn("text-left")}>
              <tr>
                <th className={cn("pl-4")}>Report ID</th>
                <th className={cn("pl-4")}>Type</th>
                <th className={cn("pl-4")}>Location</th>
                <th className={cn("pl-4")}>Status</th>
                <th className={cn("pl-4")}>Reported By</th>
                <th className={cn("pl-4")}>Time</th>
              </tr>
            </thead>
            {/* ====== table body ====== */}
            <tbody>
              {/* TR */}
              {typeof recentReports === "string" ? (
                <tr
                  className={cn(
                    "text-custom-green",
                    recentReports.includes("Unable") && "text-accent",
                  )}
                >
                  <td>{recentReports}</td>
                </tr>
              ) : (
                recentReports.map((report: any) => (
                  <tr key={report.reportId}>
                    {/* ====== report id ====== */}
                    <td className={cn("border-b border-gray-600 p-4")}>
                      {report.reportId}
                    </td>
                    {/* ====== type ====== */}
                    <td className={cn("border-b border-gray-600 p-4")}>
                      {report.incident_type}
                    </td>
                    {/* ====== location ====== */}
                    <td className={cn("border-b border-gray-600 p-4")}>
                      {report.location}
                    </td>
                    {/* ====== status ====== */}
                    <td className={cn("border-b border-gray-600 p-4")}>
                      <p
                        className={cn(
                          "bg-green-300/20 w-max px-2 rounded-full text-green-600 font-bold",
                          report.status === "active" &&
                            "bg-custom-orange/20 text-custom-orange",
                        )}
                      >
                        {report.status}
                      </p>
                    </td>
                    {/* ====== reported by ====== */}
                    <td className={cn("border-b border-gray-600 p-4")}>
                      {report.reported_by}
                    </td>
                    {/* ====== time ====== */}
                    <td className={cn("border-b border-gray-600 p-4")}>
                      {report.time}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
