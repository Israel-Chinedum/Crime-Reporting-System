import { cn } from "../utilities/classNames";
import { FaBell, FaExclamationTriangle, FaHome } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type adminDashboard = {
  active: "dashboard" | "reports" | "map" | "users" | "alerts";
};

export const AdminSideBar = ({ active = "dashboard" }: adminDashboard) => {
  const navigate = useNavigate();

  return (
    <nav className={cn("text-custom-white bg-deep w-50 h-dvh")}>
      <h1 className={cn("text-xl font-bold pl-4 pt-10 mb-5")}>FPOG CRS</h1>

      <ul className={cn("")}>
        {/* ====== Dashboard link ====== */}
        <li
          className={cn(
            "flex items-center gap-2 p-4 hover:bg-navy cursor-pointer",
            active === "dashboard" && "text-blue-600",
          )}
          onClick={() => navigate("/admin-dashboard")}
        >
          <FaHome className={cn("text-xl")} />
          Dashboard
        </li>

        {/* ====== Reports link ====== */}
        <li
          className={cn(
            "flex items-center gap-2 p-4 hover:bg-navy cursor-pointer",
            active === "reports" && "text-blue-600",
          )}
          onClick={() => navigate("/admin-reports")}
        >
          <FaFile className={cn("text-xl")} />
          Reports
        </li>

        {/* ====== Alerts link ====== */}
        <li
          className={cn(
            "flex items-center gap-2 p-4 hover:bg-navy cursor-pointer",
            active === "alerts" && "text-blue-600",
          )}
          onClick={() => navigate("/admin-alerts")}
        >
          <FaExclamationTriangle className={cn("text-xl")} />
          Alerts
        </li>

        {/* ====== Map View link ====== */}
        <li
          className={cn(
            "flex items-center gap-2 p-4 hover:bg-navy cursor-pointer",
            active === "map" && "text-blue-600",
          )}
          onClick={() => navigate("/admin-map")}
        >
          <MdSecurity className={cn("text-xl")} />
          Security Tips
        </li>

        {/* ====== Users link ====== */}
        <li
          className={cn(
            "flex items-center gap-2 p-4 hover:bg-navy cursor-pointer",
            active === "users" && "text-blue-600",
          )}
        >
          <FaUserGroup className={cn("text-xl")} />
          Users
        </li>
      </ul>
    </nav>
  );
};
