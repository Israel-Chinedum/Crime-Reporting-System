import { FaAngleRight } from "react-icons/fa";
import { cn } from "../../../../utilities/classNames";
import { SideBar } from "../../../../Components/SideBar";
import { useTrackMyReport } from "./useTrackMyReport";
import { InAppHeader } from "../../../../Components/InAppHeader";

export const TrackMyReport = () => {
  const { myReports } = useTrackMyReport();

  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse")}>
      <SideBar active="home" />
      <div className={cn("w-full flex flex-col p-3 h-dvh")}>
        <InAppHeader
          content=""
          routeBack="/home"
          arrowClasses="text-custom-white text-xl"
        />
        <section
          className={cn(
            "text-custom-white w-[95%] mx-auto",
            "sm:w-[80%] md:w-[70%] lg:w-[60%]",
          )}
        >
          <h2 className={cn("text-2xl font-bold")}>Track My Reports</h2>
          <h2 className={cn("text-gray-400")}>
            Monitor the status of your submitted reports.
          </h2>

          <div
            className={cn("mt-5 flex flex-col gap-4 h-[87dvh] overflow-y-auto")}
          >
            {myReports.length === 0 ? (
              <h2>No reports yet!</h2>
            ) : (
              myReports.map((report: any) => (
                <div
                  className={cn(
                    "flex justify-between items-start bg-deep p-4 rounded-xl",
                  )}
                  key={report.reportId}
                >
                  <div className={cn("w-full")}>
                    <div className={cn("flex gap-2 items-center justify-end")}>
                      <h2>{report.date.slice(0, 10)}</h2>
                      <h2
                        className={cn(
                          "p-2 rounded-md whitespace-nowrap text-[0.7rem]",
                          "sm:text-[0.8rem] lg:text-[1rem]",
                          report.status === "active" &&
                            "bg-amber-700/30 text-custom-orange",
                          report.status === "resolved" &&
                            "bg-custom-green/20 text-custom-green",
                        )}
                      >
                        {report.status === "active"
                          ? "Under review"
                          : "Resolved"}
                      </h2>
                      <h2 className={cn("flex items-center cursor-pointer")}>
                        View <FaAngleRight />
                      </h2>
                    </div>
                    <h2 className={cn("text-xl font-bold")}>Robbery</h2>

                    <h2
                      className={cn(
                        "w-full line-clamp-3 text-gray-400 text-[1rem]",
                      )}
                    >
                      {report.description}
                    </h2>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
