import { Button } from "../../../Components/Button";
import { cn } from "../../../utilities/classNames";
import { FaCheck } from "react-icons/fa";
import { SideBar } from "../../../Components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "../../../Hooks/useSocket";

export const ReportStatus = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket.emit("report-sent", { reportId });
  }, []);

  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse")}>
      <SideBar active={"home"} classes="hidden sm:block" />
      <section
        className={cn(
          "p-3 h-dvh overflow-y-auto flex flex-col items-center text-custom-white",
          "w-full",
        )}
      >
        <div
          className={cn(
            "w-20 h-20 bg-custom-green rounded-full text-custom-white",
            "flex items-center justify-center mt-5",
          )}
        >
          <FaCheck className={cn("text-4xl")} />
        </div>

        <h1 className={cn("font-bold text-2xl text-center mt-10")}>
          Report Submitted Successfully!
        </h1>
        <h2 className={cn("mt-5")}>Your report has been received.</h2>

        <div className={cn("bg-deep p-2 rounded-md mt-10 w-full mobile:w-100")}>
          <h2 className={cn("text-[14px] text-gray-400")}>Report ID</h2>
          <h1 className={cn("mt-3 font-bold text-xl")}>{reportId}</h1>
        </div>

        <h2 className={cn("mt-5")}>You will be notified about updates.</h2>

        <div
          className={cn(
            "mt-auto mobile:mt-20 gap-3 w-full items-center justify-center flex flex-col mobile:flex-row",
          )}
        >
          <Button classes="text-[16px] w-full mobile:w-60">Track Report</Button>
          <Button
            onClick={() => navigate("/home")}
            classes="text-[16px] bg-custom-blue w-full mobile:w-60"
          >
            Back to Home
          </Button>
        </div>
      </section>
    </div>
  );
};
