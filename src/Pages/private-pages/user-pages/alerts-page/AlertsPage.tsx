import { InAppHeader } from "../../../../Components/InAppHeader";
import { cn } from "../../../../utilities/classNames";
import { SideBar } from "../../../../Components/SideBar";
import { useNotificationsPage } from "./useNotificationsPage";

export const AlertsPage = () => {
  const { notifications } = useNotificationsPage();

  return (
    <div className={cn("flex flex-col-reverse sm:flex-row h-dvh")}>
      <SideBar active="alerts" classes="sm:block" />
      <section
        className={cn(
          "text-custom-white p-3 h-dvh",
          "grid grid-rows-[50px_1fr] w-full overflow-auto relative",
        )}
      >
        <div
          className={cn(
            "bg-[url('/fpog-logo.png')] bg-no-repeat  bg-center",
            "absolute w-full h-full inset-0 z-[-1] opacity-20",
          )}
        ></div>
        <InAppHeader
          content="Notifications"
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
          {notifications.length !== 0 ? (
            notifications.map((notification) => (
              <div
                key={new Date(notification.createdAt).getTime()}
                className={cn("bg-deep p-3 rounded-md mt-2")}
              >
                <div className={cn("flex justify-between")}>
                  <h1 className={cn("font-bold")}>
                    {notification.incident_type.toUpperCase()}
                  </h1>
                  <div className={cn("sm:flex gap-4 items-center")}>
                    <p className={cn("text-[14px] text-gray-400")}>
                      {notification.time}
                    </p>
                    <p className={cn("text-[14px] text-gray-400")}>
                      {notification.date.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <p className={cn("mt-4")}>{notification.description}</p>
                <p className={cn("mt-4 text-gray-400")}>
                  Location: {notification.location}
                </p>
              </div>
            ))
          ) : (
            <h1 className={cn("text-2xl text-custom-orange text-center")}>
              No notifications yet!
            </h1>
          )}
        </div>
      </section>
    </div>
  );
};
