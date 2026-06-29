import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { cn } from "../../../../utilities/classNames";
import { MdSos } from "react-icons/md";
import { Button } from "../../../../Components/Button";
import { LuMapPin } from "react-icons/lu";

export const AdminAlertsPage = () => {
  return (
    <div className={cn("flex text-custom-white")}>
      <AdminSideBar active="alerts" />
      <section className={cn("w-full p-3")}>
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
          <h1 className={cn("py-2 px-4 text-xl")}>Emergency Alerts</h1>
        </div>

        {/* ====== BODY ====== */}
        <div>
          <table className={cn("mt-5 w-full")}>
            <thead className={cn("text-left")}>
              <tr className={cn("border-b border-gray-600 bg-custom-blue")}>
                <th className={cn("text-xl px-2 py-5")}>Alert Type</th>
                <th className={cn("text-xl px-2 py-5")}>Time</th>
                <th className={cn("text-xl px-2 py-5")}>Priority</th>
                <th className={cn("text-xl px-2 py-5")}>Location</th>
                <th className={cn("text-xl px-2 py-5")}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className={cn("border-b border-gray-600")}>
                {/* ====== Alert type ====== */}
                <td className={cn("p-4 flex items-center gap-4 ")}>
                  <div className={cn("w-max p-4 rounded-full bg-accent")}>
                    <MdSos className={cn("text-4xl")} />
                  </div>
                  <div>
                    <h1 className={cn("text-accent text-xl font-bold")}>
                      SOS Emergency Alert
                    </h1>
                    <p>Bonny Island, Rivers State</p>
                  </div>
                </td>

                {/* ====== Time ====== */}
                <td className={cn("p-4")}>
                  <h1>2 min ago</h1>
                </td>

                {/* ====== Priority ====== */}
                <td>
                  <h1
                    className={cn(
                      "py-3 px-4 text-accent bg-accent-dim w-max rounded-md",
                    )}
                  >
                    High
                  </h1>
                </td>

                {/* ====== Location ====== */}
                <td>
                  <h1 className={cn("text-xl flex items-center gap-2")}>
                    <LuMapPin className={cn("text-4xl text-custom-green")} />
                    Bonny Island, Rivers State
                  </h1>
                </td>

                {/* ====== More details button ====== */}
                <td>
                  <Button classes="w-max px-4 bg-custom-blue">
                    View Details
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
