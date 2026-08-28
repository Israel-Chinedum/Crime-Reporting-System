import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { cn } from "../../../../utilities/classNames";
import { MdSos } from "react-icons/md";
import { Button } from "../../../../Components/Button";
import { LuMapPin } from "react-icons/lu";
import { useAdminAlerts } from "./useAdminAlerts";
import { useReportBox } from "../../../../Components/ReportBox";
import { useState } from "react";
import { useAdminReports } from "../admin-reports-page/useAdminReports";

export const AdminAlertsPage = () => {
  const { alerts } = useAdminAlerts();
  const { getSrc } = useAdminReports({ autoFetch: false });
  const { showBox, setShowBox, runShowBox, setSrc } = useReportBox({
    controls: false,
  });
  const [reportData, setReportData] = useState<any>(null);

  return (
    <div className={cn("flex text-custom-white relative")}>
      <AdminSideBar active="alerts" />
      <section className={cn("w-full p-3")}>
        {showBox &&
          runShowBox({
            reportId: reportData?.reportId,
            incident_type: reportData?.incident_type,
            date: reportData?.date,
            time: reportData?.time,
            location: reportData?.location,
            actual_location: reportData?.actual_location,
            description: reportData?.description,
            reported_by: reportData?.reported_by,
            evidence_provided: reportData?.evidence_provided,
            fileMetaData: reportData?.fileMetaData,
          })}
        {/* ====== HEADER ====== */}
        <div
          className={cn("flex border-b border-gray-600 w-max cursor-default")}
        >
          <h1
            className={cn(
              "py-2 px-4 bg-custom-blue rounded-tl-md rounded-tr-md text-xl",
            )}
          >
            All Alerts
          </h1>
          {/* <h1 className={cn("py-2 px-4 text-xl")}>Emergency Alerts</h1> */}
        </div>

        {/* ====== BODY ====== */}
        <div className={cn("h-[90dvh] overflow-y-auto relative")}>
          <table className={cn("mt-5 w-full")}>
            <thead className={cn("text-left sticky top-0")}>
              <tr className={cn("border-b border-gray-600 bg-custom-blue")}>
                <th className={cn("text-xl px-2 py-5")}>Alert Type</th>
                <th className={cn("text-xl px-2 py-5")}>Time</th>
                <th className={cn("text-xl px-2 py-5")}>Priority</th>
                <th className={cn("text-xl px-2 py-5")}>Location</th>
                <th className={cn("text-xl px-2 py-5")}>Details</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length === 0 ? (
                <tr>
                  <td className={cn("text-3xl text-gray-400 p-4")}>
                    No alerts at the moment!
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr
                    key={alert.reportId}
                    className={cn("border-b border-gray-600")}
                  >
                    {/* ====== Alert type ====== */}
                    <td className={cn("p-4 flex items-center gap-4 ")}>
                      <div className={cn("w-max p-4 rounded-full bg-accent")}>
                        <MdSos className={cn("text-4xl")} />
                      </div>
                      <div>
                        <h1 className={cn("text-accent text-xl font-bold")}>
                          SOS Emergency Alert
                        </h1>
                        <p>{alert.incident_type}</p>
                      </div>
                    </td>

                    {/* ====== Time ====== */}
                    <td className={cn("p-4")}>
                      <h1>{alert.time}</h1>
                    </td>

                    {/* ====== Priority ====== */}
                    <td>
                      <h1
                        className={cn(
                          "py-3 px-4 w-max rounded-md",
                          alert.type === "emergency" &&
                            "bg-accent-dim text-accent",
                          alert.type === "normal" &&
                            "bg-custom-orange/20 text-custom-orange",
                        )}
                      >
                        {alert.type === "emergency" ? "High" : "Medium"}
                      </h1>
                    </td>

                    {/* ====== Location ====== */}
                    <td>
                      <h1 className={cn("text-xl flex items-center gap-2")}>
                        <LuMapPin
                          className={cn("text-4xl text-custom-green")}
                        />
                        {alert.location}
                      </h1>
                    </td>

                    {/* ====== More details button ====== */}
                    <td>
                      <Button
                        onClick={async () => {
                          setReportData(alert);
                          setShowBox(true);
                          const src: string = await getSrc(alert.reportId);
                          setSrc(src);
                        }}
                        classes="w-max px-4 bg-custom-blue"
                      >
                        View Details
                      </Button>
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
