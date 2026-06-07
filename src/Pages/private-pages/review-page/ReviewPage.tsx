import { InAppHeader } from "../../../Components/InAppHeader";
import { Stepper } from "../../../Components/Stepper";
import { cn } from "../../../utilities/classNames";
import { Button } from "../../../Components/Button";
import { SideBar } from "../../../Components/SideBar";

export const ReviewPage = () => {
  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse")}>
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
              <h2>Robbery</h2>
            </div>

            {/* location */}
            <div className={cn("border-b border-b-gray-700 p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>Location</p>
              <h2>Shool Gate</h2>
            </div>

            {/* date and time */}
            <div className={cn("border-b border-b-gray-700 p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>
                Date & Time
              </p>
              <div>
                <h2>May 21, 2024</h2>
                <h2>10:30 AM</h2>
              </div>
            </div>

            {/* description */}
            <div className={cn("border-b border-b-gray-700 p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>
                Description
              </p>
              <h2>
                A group of ment robbed a student at gunpoint near the school
                gate.
              </h2>
            </div>

            {/* evidence */}
            <div className={cn(" p-3")}>
              <p className={cn("text-[14px] text-gray-400 mb-4")}>
                Evidence (1)
              </p>
              <div className={cn("p-4 bg-navy rounded-md")}></div>
            </div>
          </form>

          {/* ====== CHECK IF USER WANTS TO REPORT ANONYMOUSLY ====== */}
          <div className={cn("flex gap-2 mt-5 mb-10")}>
            <input type="checkbox" className={cn("w-5 ")} />
            <p>Report anonymously</p>
          </div>

          <Button classes="w-full mobile:w-60">Submit Report</Button>
        </div>
      </section>
    </div>
  );
};
