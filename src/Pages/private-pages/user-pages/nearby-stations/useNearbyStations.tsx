import { useEffect, useState } from "react";
import { useFetch } from "../../../../Hooks/useFetch";
import { useMessage } from "../../../../Hooks/useMessage";
import { useLocation } from "../../../../Hooks/useLocation";

export const useNearbyStations = () => {
  const { postRequest } = useFetch();
  const { showMessage, closeMessage } = useMessage();
  const { setLocation } = useLocation();
  const [accuracyMsg, setAccuracyMsg] = useState("");
  const [locationAccuacy, setLocationAccuracy] = useState<
    "medium" | "low" | "high"
  >("medium");
  const [retry, setRetry] = useState(0);

  const [locationDetails, setLocationDetails] = useState<{
    userLat: string;
    userLng: string;
    coordinates: any[];
  } | null>(null);

  const getSecurityLocations = async () => {
    let userLocation: any = await setLocation();

    if (typeof userLocation === "string") {
      showMessage({ text: userLocation, status: "warning" });
      return;
    }

    if (userLocation.accuracy > 15) {
      setAccuracyMsg(
        "Location provided may not be correct please click the retry button and make sure you are in an open area!",
      );
      setLocationAccuracy("low");
    } else if (userLocation > 10) {
      setAccuracyMsg("Note! location provided may be slighly off");
      setLocationAccuracy("medium");
    } else {
      setAccuracyMsg("98% accurate!");
      setLocationAccuracy("high");
    }

    const { error, response } = await postRequest({
      route: "/report/security-locations",
      data: {
        lat: userLocation.lat.toString(),
        lng: userLocation.lng.toString(),
      },
      type: "object",
    });

    if (error) {
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      setLocationDetails({
        userLat: userLocation.lat,
        userLng: userLocation.lng,
        coordinates: response,
      });

      closeMessage();
    }
  };

  useEffect(() => {
    const requestLocations = async () => {
      showMessage({
        text: "Fetching security locations...",
        status: "pending",
        timeout: null,
      });
      await getSecurityLocations();
    };

    requestLocations();

    return () => {
      closeMessage();
    };
  }, [retry]);

  return { locationDetails, setRetry, accuracyMsg, locationAccuacy };
};
