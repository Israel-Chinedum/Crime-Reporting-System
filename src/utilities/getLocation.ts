import type { messageType } from "../Contexts/MessageContext";

export const getLocation = (showMessage: (arg: messageType) => void) => {
  if ("geolocation" in navigator) {
    let pos: string;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const data = JSON.stringify({
          accuracy: position.coords.accuracy,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        showMessage({ text: data, status: "normal", timeout: null });
      },
      (error) => {
        console.log("ERROR: ", error);
      },
      { timeout: 10000, maximumAge: 0 },
    );
    // navigator.permissions
    //   .query({ name: "geolocation" })
    //   .then((result) => console.log("RESULT STATE: ", result.state));

    return new Promise((resolve) => {
      if (pos) {
        return resolve(pos);
      }
    });
  } else {
    console.log("Geolocation not supported by this browser");
    return "Geolocation not supported by this browser";
  }
};
