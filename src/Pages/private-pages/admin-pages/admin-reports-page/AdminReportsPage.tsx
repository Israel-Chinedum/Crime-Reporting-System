import { useState } from "react";
import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { cn } from "../../../../utilities/classNames";
import { FaEye } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

export const AdminReportsPage = () => {
  const [display, setDisplay] = useState(false);

  return (
    <div
      className={cn("flex h-dvh")}
      onClick={() => {
        display && setDisplay(false);
      }}
    >
      <AdminSideBar active="reports" />
      <section className={cn("text-custom-white p-3 overflow-y-auto w-full")}>
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
            <tr className={cn("border-b border-gray-600")}>
              {/* ====== Report id ====== */}
              <td className={cn("p-4")}>CR-2026-05-21-0007</td>
              {/* ====== Type ====== */}
              <td className={cn("p-4")}>Robbery</td>
              {/* ====== Location ====== */}
              <td className={cn("p-4")}>School Gate</td>
              {/* ====== Status ====== */}
              <td className={cn("p-4")}>
                <p
                  className={cn(
                    "bg-green-300 w-max px-2 rounded-full text-green-600 font-bold",
                  )}
                >
                  In Progress
                </p>
              </td>

              {/* ====== Reported by ====== */}
              <td className={cn("p-4")}>Anonymous</td>

              {/* ====== Time ====== */}
              <td className={cn("p-4")}>10:36 AM</td>

              {/* ====== Actions ====== */}
              <td className={cn("flex gap-2 text-2xl items-center p-4")}>
                <FaEye className={cn("cursor-pointer hover:text-blue-600")} />
                <div className={cn("relative")}>
                  <MdMoreVert
                    className={cn("cursor-pointer hover:text-blue-600")}
                    onClick={() => {
                      display ? setDisplay(false) : setDisplay(true);
                    }}
                  />
                  <ul
                    className={cn(
                      "text-[16px] bg-deep rounded-md absolute",
                      "w-max top-[120%] left-[-150%] overflow-hidden",
                      display ? "block" : "hidden",
                    )}
                  >
                    <li
                      className={cn(
                        "py-2 px-3 cursor-pointer hover:bg-blue-600",
                        "border-b border-gray-700",
                      )}
                    >
                      Resolve
                    </li>
                    <li
                      className={cn(
                        "py-2 px-3 cursor-pointer hover:bg-blue-600",
                        "border-b border-gray-700",
                      )}
                    >
                      In progress
                    </li>
                    <li
                      className={cn(
                        "py-2 px-3 cursor-pointer hover:bg-blue-600",
                      )}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
