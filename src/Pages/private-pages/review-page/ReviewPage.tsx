import { InAppHeader } from "../../../Components/InAppHeader";
import { Stepper } from "../../../Components/Stepper";
import { cn } from "../../../utilities/classNames";
import { Button } from "../../../Components/Button";
import { SideBar } from "../../../Components/SideBar";
import { useReport } from "../../../Hooks/useReport";
import { useReviewPage } from "./useReviewPage";

export const ReviewPage = () => {
  const { getReportData } = useReport();
  const reportData = getReportData();
  const { loadAnimation, runLoadAnimation, sendReport, anonymous } =
    useReviewPage();

  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse")}>
      {loadAnimation.state && runLoadAnimation()}
      <SideBar active={"home"} classes="hidden sm:block" />
      <section
        className={cn(
          "flex flex-col items-center h-screen text-custom-white p-3",
          "overflow-y-auto w-full",
        )}
      >
        <div className={cn("w-full")}>
          <InAppHeader content="Report a Crime" routeBack="/evidence" />
          <div className={cn("my-8")}></div>
          <Stepper
            progressIndex={3}
            bgColor="bg-navy"
            progressColor="bg-blue-600"
          />
        </div>

        <div className={cn("w-full sm:w-120 md:w-145 lg:w-200")}>
          <h1 className={cn("text-xl font-bold mt-10 mb-5")}>
            3. Review & Confirm
          </h1>
          <form action="" className={cn("bg-deep rounded-md")}>
            {/* incident type */}
            <div className={cn("border-b border-b-gray-700 p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>
                Incident Type
              </p>
              <h2>{reportData.incident_type}</h2>
            </div>

            {/* location */}
            <div className={cn("border-b border-b-gray-700 p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>Location</p>
              <h2>{reportData.location}</h2>
            </div>

            {/* date and time */}
            <div className={cn("border-b border-b-gray-700 p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>
                Date & Time
              </p>
              <div>
                <h2>{reportData.date}</h2>
                <h2>{reportData.time}</h2>
              </div>
            </div>

            {/* description */}
            <div className={cn("border-b border-b-gray-700 p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>
                Description
              </p>
              <h2>{reportData.description}</h2>
            </div>

            {/* evidence */}
            <div className={cn(" p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>Evidence</p>
              <div
                className={cn(
                  "p-4 bg-navy rounded-md max-w-120 max-h-100",
                  "overflow-hidden",
                )}
              >
                {(() => {
                  if (reportData.evidence_provided === "true") {
                    const file = reportData.file;
                    if (file.type.includes("image")) {
                      return (
                        <div className={cn("w-120 h-100 overflow-hidden")}>
                          <img
                            className={cn("max-w-full h-[90%]")}
                            src={URL.createObjectURL(file)}
                            alt=""
                          />
                          <p>{file.name}</p>
                        </div>
                      );
                    }
                    if (file.type.includes("video")) {
                      return (
                        <>
                          <video
                            src={URL.createObjectURL(file)}
                            controls
                          ></video>
                          <p>{file.name}</p>
                        </>
                      );
                    }
                    if (file.type.includes("audio")) {
                      return (
                        <>
                          <audio
                            src={URL.createObjectURL(file)}
                            controls
                          ></audio>
                          <p>{file.name}</p>
                        </>
                      );
                    }
                  } else {
                    return <p>No evidence provided</p>;
                  }
                })()}
              </div>
            </div>
          </form>

          {/* ====== CHECK IF USER WANTS TO REPORT ANONYMOUSLY ====== */}
          <div className={cn("flex gap-2 mt-5 mb-10")}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  anonymous.current = true;
                } else {
                  anonymous.current = false;
                }
              }}
              className={cn("w-5 ")}
            />
            <p>Report anonymously</p>
          </div>

          <Button classes="w-full mobile:w-60" onClick={() => sendReport()}>
            Submit Report
          </Button>
        </div>
      </section>
    </div>
  );
};
