import { InAppHeader } from "../../../../Components/InAppHeader";
import { SideBar } from "../../../../Components/SideBar";
import { cn } from "../../../../utilities/classNames";
import { useSafetyTips } from "./useSafetyTips";

export const SafetyTipsPage = () => {
  const { tips } = useSafetyTips();

  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse ")}>
      <SideBar active="home" />

      <div
        className={cn(
          "w-full py-3 flex flex-col relative h-full overflow-auto",
        )}
      >
        <div
          className={cn(
            "bg-[url('/fpog-logo.png')] bg-no-repeat  bg-center",
            "absolute w-full h-full inset-0 z-[-1] opacity-20 bg-size-[150%_80%] sm:bg-auto",
          )}
        ></div>
        <InAppHeader
          content=""
          routeBack="/home"
          arrowClasses="text-custom-white text-xl ml-4"
        />

        <section
          className={cn(
            "text-custom-white px-[2.5%] sm:px-[10%] h-full md:px-[15%] lg:px-[20%] mx-auto",
            "overflow-auto",
          )}
        >
          <h2 className={cn("text-2xl font-bold mt-4")}>Safety Tips</h2>
          <div className={cn("flex flex-col gap-4 mt-5")}>
            {tips.length === 0 ? (
              <p>No tips yet!</p>
            ) : (
              tips.map((tip: any) => (
                <div
                  key={tip.title}
                  className={cn("bg-deep p-4 rounded-md shadow-xl")}
                >
                  <h2 className={cn("text-xl font-bold")}>{tip.title}</h2>
                  <p
                    className={cn("text-gray-400 bg-navy p-2 rounded-md mt-2")}
                  >
                    {tip.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
