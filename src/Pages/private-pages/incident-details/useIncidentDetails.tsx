import { useEffect, useRef } from "react";
import { getLocation } from "../../../utilities/getLocation";

export const useIncidentDetails = () => {
  const location = useRef<unknown>(null);

  const setLocation = async () => {
    location.current = await getLocation();
  };

  useEffect(() => {
    setLocation();
  }, []);

  return { location: location.current };
};
