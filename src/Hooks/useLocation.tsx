import { useRef } from "react";
import { getLocation } from "../utilities/getLocation";

export const useLocation = () => {
  const location = useRef<any>(null);

  const setLocation = async () => {
    try {
      const userLocation = await getLocation();
      location.current = userLocation;
      return userLocation;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { location, setLocation };
};
