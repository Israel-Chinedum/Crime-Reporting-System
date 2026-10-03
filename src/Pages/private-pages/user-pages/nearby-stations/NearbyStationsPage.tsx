import { Button } from "../../../../Components/Button";
import { InAppHeader } from "../../../../Components/InAppHeader";
import { Map } from "../../../../Components/Map";
import { SideBar } from "../../../../Components/SideBar";
import { cn } from "../../../../utilities/classNames";
import { useNearbyStations } from "./useNearbyStations";

export const NearbyStationsPage = () => {
  const { locationDetails, setRetry, accuracyMsg, locationAccuacy } =
    useNearbyStations();

  return (
    <div
      className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse relative")}
    >
      <div
        className={cn(
          "bg-[url('/fpog-logo.png')] bg-no-repeat  bg-center",
          "absolute w-full h-full inset-0 z-[-1] opacity-20 bg-size-[150%_80%] sm:bg-auto",
        )}
      ></div>

      <SideBar active="home" />
      <div className={cn("w-full p-3 relative h-dvh overflow-auto")}>
        <InAppHeader
          content=""
          routeBack="/home"
          arrowClasses="text-custom-white text-xl"
        />

        <section
          className={cn(
            "text-custom-white py-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto",
          )}
        >
          <h2 className={cn("text-2xl font-bold mt-4")}>Nearby stations</h2>

          {locationDetails && (
            <div className={cn("h-[50vh] sm:h-[70vh]")}>
              <Map
                userLocation={{
                  lat: Number(locationDetails?.userLat),
                  lng: Number(locationDetails?.userLng),
                }}
                stations={locationDetails?.coordinates!}
              />
            </div>
          )}

          <div className={cn("bg-deep p-4 rounded-xl mt-4")}>
            <>
              {locationDetails && (
                <h2
                  className={cn(
                    locationAccuacy == "low" && "text-accent",
                    locationAccuacy == "medium" && "text-custom-orange",
                    locationAccuacy == "high" && "text-custom-green",
                  )}
                >
                  {accuracyMsg}
                </h2>
              )}
              <div className={cn("sm:w-60")}>
                <Button
                  classes="mt-2 w-full"
                  onClick={() => setRetry((prev) => prev + 1)}
                >
                  Retry
                </Button>
              </div>
            </>
          </div>
        </section>
      </div>
    </div>
  );
};
