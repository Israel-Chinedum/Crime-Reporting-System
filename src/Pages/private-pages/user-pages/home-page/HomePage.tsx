import { FaPhoneAlt } from "react-icons/fa";
import { useHomePage } from "./useHomePage";
import { cn } from "../../../../utilities/classNames";
import { SideBar } from "../../../../Components/SideBar";
import { useLocation } from "../../../../Hooks/useLocation";
import { useMessage } from "../../../../Hooks/useMessage";

export const HomePage = () => {
  const {
    username,
    quickActions,
    loadAnimation,
    setLoadAnimation,
    runLoadAnimation,
    navigate,
    sendSOS,
  } = useHomePage();
  const { showMessage } = useMessage();
  const { setLocation } = useLocation();

  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse")}>
      {loadAnimation.state && runLoadAnimation()}
      <SideBar active={"home"} />
      <section
        id="home-page"
        className={cn("h-full w-full text-custom-white p-3")}
      >
        <div
          className={cn(
            "mobile:flex mobile:items-center mobile:justify-between gap-2 mobile:flex-wrap",
          )}
        >
          <div>
            <h1 className={cn("text-2xl font-bold")}>Hello, {username} 👋</h1>
            <h3>How can we help you today?</h3>
          </div>

          {/* ====== SOS BUTTON ====== */}
          <div
            className={cn(
              "flex items-center gap-3 bg-accent text-custom-white",
              "rounded-md px-4 py-5 mt-5 cursor-default",
              //   mobile and above
              "mobile:max-w-[320px]",
            )}
            onClick={() => sendSOS()}
          >
            <FaPhoneAlt className={cn("text-3xl")} />
            <div onClick={() => {}}>
              <h2 className={cn("font-bold text-[18px]")}>Emergency SOS</h2>
              <p className={cn("text-[14px]")}>
                Tap to call for immediate help
              </p>
            </div>
          </div>
        </div>

        {/* ====== Quick Actions ====== */}
        <h1 className={cn("text-xl font-bold mt-10 mb-5")}>Quick Actions</h1>

        <div
          className={cn(
            "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2",
          )}
        >
          {quickActions.map((action, index) => (
            <div
              key={index}
              className={cn(
                "bg-deep px-2 py-4 rounded-md flex flex-col",
                "items-center gap-2 cursor-default",
              )}
              onClick={async () => {
                if (action.name === "Report a Crime") {
                  setLoadAnimation({ state: true });
                  const location = await setLocation();
                  setLoadAnimation({ state: false });
                  if (typeof location === "string") {
                    showMessage({
                      text: location,
                      status: "warning",
                      timeout: 7000,
                    });
                  } else {
                    navigate("/incident-details");
                  }
                }
                if (action.name === "Track My Reports") {
                  navigate("/track-my-reports");
                }
                if (action.name === "Safety Tips") {
                  navigate("/safety-tips");
                }
              }}
            >
              <span className={cn("text-4xl text-custom-green")}>
                {action.icon}
              </span>
              <h2 className={cn("font-bold text-center")}>{action.name}</h2>
              <p className={cn("text-center text-[14px]")}>
                {action.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
