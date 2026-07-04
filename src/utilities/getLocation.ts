export const getLocation = () => {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            accuracy: position.coords.accuracy,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          if (
            error.code === error.PERMISSION_DENIED ||
            error.code === error.POSITION_UNAVAILABLE
          ) {
            reject({ message: "Permission denied or position unavailable!" });
          } else reject({ message: "Failed to get user location!" });
        },
        { timeout: 10000, maximumAge: 0 },
      );
    });
  } else {
    console.log("Geolocation not supported by this browser");
    return "Geolocation not supported by this browser";
  }
};
