import { useEffect, useRef } from "react";
import { getLocation } from "../utilities/getLocation";

export const useLocation = () => {
  const location = useRef<unknown>(null);

  console.log("hello");

  const setLocation = async () => {
    location.current = await getLocation();
    console.log(location.current);
  };

  useEffect(() => {
    setLocation();
  }, []);

  return { location: location.current };
};
