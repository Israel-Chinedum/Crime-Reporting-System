import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { cn } from "../../../../utilities/classNames";
import { MdMoreVert } from "react-icons/md";
import { useAdminReports } from "./useAdminReports";
import { FaEye } from "react-icons/fa";
import { useReportBox } from "../../../../Components/ReportBox";
import { useState } from "react";

export const AdminReportsPage = () => {
  const { reports, toggleActVisibility, updateReport, getSrc } =
    useAdminReports({});
  const { showBox, setShowBox, runShowBox, setSrc } = useReportBox({});
  const [reportData, setReportData] = useState<any>(null);

  return (
    <div className={cn("flex h-dvh relative")}>
      <AdminSideBar active="reports" />
      <section
        className={cn(
          "text-custom-white p-3 overflow-y-auto w-full select-none relative",
        )}
      >
        <div
          className={cn(
            "bg-[url('/fpog-logo.png')] bg-no-repeat  bg-center",
            "absolute w-full h-full inset-0 z-[-1] opacity-3",
          )}
        ></div>
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
            updateReport,
          })}
        <h1 className={cn("mt-5 mb-10")}>Reports</h1>

        <table className={cn("w-full")}>
          {/* ====== table head ====== */}
          <thead className={cn("text-left")}>
            <tr>
              <th className={cn("pl-4 pb-5 text-[18px]")}>Report ID</th>
              <th className={cn("pl-4 pb-5 text-[18px]")}>Incident Type</th>
              <th className={cn("pl-4 pb-5 text-[18px]")}>Location</th>
              <th className={cn("pl-4 pb-5 text-[18px]")}>Status</th>
              <th className={cn("pl-4 pb-5 text-[18px]")}>Reported By</th>
              <th className={cn("pl-4 pb-5 text-[18px]")}>Date & Time</th>
              <th className={cn("pl-4 pb-5 text-[18px]")}>Actions</th>
            </tr>
          </thead>
          {/* ====== table body ====== */}
          <tbody>
            {/* TR */}
            {typeof reports !== "string" &&
              reports.map((report: any) => (
                <tr
                  key={report.reportId}
                  className={cn("border-b border-gray-600")}
                >
                  {/* ====== Report id ====== */}
                  <td className={cn("p-4")}>{report.reportId}</td>
                  {/* ====== Type ====== */}
                  <td className={cn("p-4")}>{report.incident_type}</td>
                  {/* ====== Location ====== */}
                  <td className={cn("p-4")}>{report.location}</td>
                  {/* ====== Status ====== */}
                  <td className={cn("p-4")}>
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

                  {/* ====== Reported by ====== */}
                  <td className={cn("p-4")}>{report.reported_by}</td>

                  {/* ====== Time ====== */}
                  <td className={cn("p-4")}>{report.time}</td>

                  {/* ====== Actions ====== */}
                  <td className={cn("flex gap-2 text-2xl items-center p-4")}>
                    <FaEye
                      className={cn(
                        "cursor-pointer hover:text-blue-600 text-xl",
                      )}
                      onClick={async () => {
                        setReportData(report);
                        setShowBox(true);
                        const src: string = await getSrc(report.reportId);
                        setSrc(src);
                      }}
                    />
                    <div className={cn("relative all-reports-action-div")}>
                      <MdMoreVert
                        className={cn("cursor-pointer hover:text-blue-600")}
                        onClick={toggleActVisibility}
                      />
                      <ul
                        className={cn(
                          "text-[16px] bg-deep rounded-md absolute z-10",
                          "w-max top-[120%] left-[-150%] overflow-hidden hidden",
                        )}
                      >
                        <li
                          className={cn(
                            "py-2 px-3 cursor-pointer hover:bg-blue-600",
                            "border-b border-gray-700",
                          )}
                          onClick={() => {
                            updateReport({
                              message: "You are about to resolve this case!",
                              action: "resolved",
                              reportId: report.reportId,
                            });
                          }}
                        >
                          Resolve
                        </li>
                        <li
                          className={cn(
                            "py-2 px-3 cursor-pointer border-b hover:bg-blue-600",
                            "border-gray-700",
                          )}
                          onClick={() => {
                            updateReport({
                              message: "You are about to activate this case!",
                              action: "active",
                              reportId: report.reportId,
                            });
                          }}
                        >
                          Active
                        </li>
                        <li
                          className={cn(
                            "py-2 px-3 cursor-pointer hover:bg-blue-600",
                            "border-gray-700",
                          )}
                          onClick={() => {
                            updateReport({
                              message: "You are about to delete this report!",
                              action: "delete",
                              reportId: report.reportId,
                            });
                          }}
                        >
                          Delete
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
