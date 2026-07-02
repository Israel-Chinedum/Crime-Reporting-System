export const getLocation = () => {
  if ("geolocation" in navigator) {
    let actualLocation: any;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        actualLocation({
          accuracy: position.coords.accuracy,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        console.log("ERROR: ", error);
      },
      { timeout: 10000, maximumAge: 0 },
    );

    return new Promise((resolve) => {
      actualLocation = resolve;
    });
    // navigator.permissions
    //   .query({ name: "geolocation" })
    //   .then((result) => console.log("RESULT STATE: ", result.state));
  } else {
    console.log("Geolocation not supported by this browser");
    return "Geolocation not supported by this browser";
  }
};
