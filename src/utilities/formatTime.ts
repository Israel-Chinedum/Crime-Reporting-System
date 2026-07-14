export const formatTime = (time: string) => {
  if (time.includes("AM") || time.includes("PM")) {
    return time;
  }
  const [hour, minute] = time.split(":");
  const ampm = Number(hour) >= 12 ? "PM" : "AM";
  return `${hour}:${minute} ${ampm}`;
};
