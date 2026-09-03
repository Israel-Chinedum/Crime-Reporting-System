import { FaBell, FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { cn } from "../utilities/classNames";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

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
      className={cn(
        classes,
        "text-custom-white bg-deep",
        "sm:w-50 sm:h-dvh relative",
      )}
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
          <span className={cn("text-[14px]", "sm:text-[18px]")}>
            Notifications
          </span>
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
      <Button
        onClick={() => {
          localStorage.removeItem("userData");
          navigate("/login");
        }}
        classes="hidden w-[90%] left-[50%] top-[100%] translate-x-[-50%] translate-y-[-130%] absolute bg-accent px-4 sm:flex items-center justify-center gap-2"
      >
        <FaSignOutAlt className={cn("text-xl")} />
        Logout
      </Button>
    </nav>
  );
};
