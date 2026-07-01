export const getLocation = async () => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          accuracy: position.coords.accuracy,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
      },
      (error) => {
        console.log("ERROR: ", error);
      },
      { timeout: 10000, maximumAge: 0 },
    );
    // navigator.permissions
    //   .query({ name: "geolocation" })
    //   .then((result) => console.log("RESULT STATE: ", result.state));
  } else {
    console.log("Geolocation not supported by this browser");
  }
};
