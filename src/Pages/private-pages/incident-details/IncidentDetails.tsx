import { InAppHeader } from "../../../Components/InAppHeader";
import { cn } from "../../../utilities/classNames";
import { Stepper } from "../../../Components/Stepper";
import { Button } from "../../../Components/Button";
import { SideBar } from "../../../Components/SideBar";
import { useLocation } from "../../../Hooks/useLocation";

export const IncidentDetails = () => {
  // ====== SET LOCATION ON PAGE LOAD ======
  useLocation();

  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse")}>
      <SideBar active={"home"} classes="hidden sm:block" />
      <section
        className={cn(
          "flex flex-col items-center p-3 h-dvh text-custom-white",
          "overflow-y-auto w-full",
        )}
      >
        <div className={cn("w-full")}>
          {/* ====== HEADER ====== */}
          <InAppHeader content="Report a Crime" routeBack="/home" />

          {/* ====== SEPARATOR ====== */}
          <div className={cn("my-8")}></div>

          {/* ====== STEPPER ====== */}
          <Stepper
            progressIndex={1}
            bgColor="bg-navy"
            progressColor="bg-blue-600"
          />
        </div>
        <div className={cn("w-full mobile:w-100 sm:w-120 md:w-145")}>
          {/* ====== INCIDENT DETAILS ====== */}
          <h1 className={cn("font-bold mt-10 text-xl")}>1. Incident Details</h1>

          <form action="" className={cn("mt-8 flex flex-col gap-7")}>
            {/* ====== TYPE OF INCIDENT ====== */}
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="type of incident">Type of incident</label>

              <select
                name="type-of-incident"
                id=""
                className={cn(
                  "bg-deep p-4 rounded-md outline-none appearance-none",
                )}
              >
                <option value="" disabled selected>
                  Select incident type
                </option>
                <option value="theft">Theft</option>
                <option value="burglary">Burglary</option>
                <option value="robbery">Robbery</option>
                <option value="assault">Assault</option>
                <option value="vandalism">Vandalism</option>
                <option value="kidnapping">Kidnapping</option>
                <option value="arson">Arson</option>
                <option value="drug-related-activity">
                  Drug-Related Activity
                </option>
                <option value="suspicious-activity">Suspicious Activity</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* ====== INCIDENT LOCATION ====== */}
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="incident location">Incident Location</label>
              <select
                name="type-of-incident"
                id=""
                className={cn(
                  "bg-deep p-4 rounded-md outline-none appearance-none",
                )}
              >
                <option value="" disabled selected>
                  Use current location
                </option>
                <option value="new-auditorium">New Auditorium</option>
                <option value="library">Library</option>
                <option value="boys-hostel">Boys Hostel</option>
                <option value="girls-hostel">Girls Hostel</option>
                <option value="old-auditorium">Old Auditorium</option>
                <option value="school-gate">School-Gate</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* ====== DESCRIPTION ====== */}
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="Provide more details..."
                name="description"
                id=""
                className={cn(
                  "bg-deep h-50 resize-none rounded-md outline-none p-4",
                )}
              ></textarea>
            </div>

            {/* ====== DATE AND TIME ======  */}
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="">Date & Time</label>
              <div className={cn("flex gap-2")}>
                <div>
                  <input
                    type="date"
                    className={cn("bg-deep p-2 rounded-md ")}
                  />
                  <p className={cn("text-gray-500 text-[14px]")}>Date</p>
                </div>
                <div>
                  <input type="time" className={cn("bg-deep p-2 rounded-md")} />
                  <p className={cn("text-gray-500 text-[14px]")}>Time</p>
                </div>
              </div>
            </div>

            {/* ====== NEXT BUTTON ====== */}
            <Button classes="w-full mobile:w-60">Next</Button>
          </form>
        </div>
      </section>
    </div>
  );
};
