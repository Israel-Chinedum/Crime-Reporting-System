export const getLocation = () => {
  const formData = new FormData();
  formData.append("key", "testing");
  console.log("hello");
  console.log("SECURE CONTEXT: ", window.isSecureContext);
  console.log("LOCATION: ", navigator.geolocation);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("hello pos");
        console.log("POSITION: ", position);
        fetch("http://localhost:3000/user", {
          // headers: { "Content-Type": "application/json" },
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      },
      (error) => {
        console.log("ERROR: ", error);
      },
      { timeout: 10000, maximumAge: 0 },
    );
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => console.log("RESULT STATE: ", result.state));
  } else {
    console.log("Geolocation not supported by this browser");
  }
};
