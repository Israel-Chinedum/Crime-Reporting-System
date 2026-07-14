import { getLocation } from "../utilities/getLocation";

export const useLocation = () => {
  const setLocation: any = async () => {
    try {
      const userLocation = await getLocation();
      return userLocation;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { setLocation };
};
