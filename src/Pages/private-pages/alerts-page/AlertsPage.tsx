import { InAppHeader } from "../../../Components/InAppHeader";
import { cn } from "../../../utilities/classNames";
import { SideBar } from "../../../Components/SideBar";

export const AlertsPage = () => {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row h-dvh")}>
      <SideBar active="alerts" classes="sm:block" />
      <section
        className={cn(
          "text-custom-white p-3 h-dvh",
          "grid grid-rows-[50px_1fr] w-full overflow-auto",
        )}
      >
        <InAppHeader
          content="Alerts"
          routeBack="/home"
          arrowClasses="mobile:hidden"
          headerClasses="mobile:mr-0"
        />
        <div
          id="alerts"
          className={cn(
            "p-1 md:mx-auto md:w-[80%] lg:w-[70%] scrollbar-none mobile:scrollbar-auto",
          )}
        >
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p className={cn("text-[14px]")}>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
          {/* ====== content ====== */}
          <div className={cn("bg-deep p-3 rounded-md mt-2")}>
            <div className={cn("flex justify-between")}>
              <h1 className={cn("font-bold")}>Emergency SOS Alert</h1>
              <p>10:35 AM</p>
            </div>
            <p>A new SOS alert has been reported near</p>
            <p>Bonny Island, Rivers State.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
