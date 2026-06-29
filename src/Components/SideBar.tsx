import { FaBell, FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { cn } from "../utilities/classNames";
import { useNavigate } from "react-router-dom";

export const SideBar = ({
  active,
  classes,
}: {
  active: "home" | "alerts" | "profile";
  classes?: string;
}) => {
  const navigate = useNavigate();

  return (
    <nav
      className={cn(classes, "text-custom-white bg-deep", "sm:w-50 sm:h-dvh")}
    >
      <ul
        className={cn("flex justify-between", "sm:flex-col sm:gap-5 sm:pt-5")}
      >
        <li
          className={cn(
            "flex flex-col items-center cursor-default p-4",
            active === "home" && "text-blue-600",
            "sm:flex-row sm:gap-2 sm:pl-10 sm:hover:bg-navy",
          )}
          onClick={() => navigate("/home")}
        >
          <FaHome className={cn("text-2xl")} />
          <span className={cn("text-[14px]", "sm:text-[18px]")}>Home</span>
        </li>

        <li
          className={cn(
            "flex flex-col items-center cursor-default p-4",
            active === "alerts" && "text-blue-600",
            "sm:flex-row sm:gap-2 sm:pl-10 sm:hover:bg-navy",
          )}
          onClick={() => navigate("/alerts")}
        >
          <FaBell className={cn("text-2xl")} />{" "}
          <span className={cn("text-[14px]", "sm:text-[18px]")}>Alerts</span>
        </li>

        <li
          className={cn(
            "flex flex-col items-center cursor-default p-4",
            active === "profile" && "text-blue-600",
            "sm:flex-row sm:gap-2 sm:pl-10 sm:hover:bg-navy",
          )}
          onClick={() => navigate("/profile")}
        >
          <FaUser className={cn("text-2xl")} />
          <span className={cn("text-[14px]", "sm:text-[18px]")}>Profile</span>
        </li>
      </ul>
    </nav>
  );
};
