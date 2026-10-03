export const getLocation = async () => {
  if ("geolocation" in navigator) {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permission.state === "denied") {
      return "Location access has been blocked. Please enable location permissions in your browser settings.";
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            accuracy: position.coords.accuracy,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (
            error.code === error.PERMISSION_DENIED ||
            error.code === error.POSITION_UNAVAILABLE
          ) {
            reject(
              "Permission denied or position unavailable! Ensure location access is not blocked in browser settings!",
            );
          } else if (error.code === error.TIMEOUT) {
            reject("Took too long to get user location!");
          } else
            reject(
              "Failed to get user location! Ensure location access is not blocked in browser settings!",
            );
        },
        { timeout: 30000, maximumAge: 0 },
      );
    });
  } else {
    console.log("Geolocation is not supported by this browser");
    return "Geolocation is not supported by this browser";
  }
};
