import { type ReactElement } from "react";
import { HiDocumentReport } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { useLoadAnimation } from "../../../Hooks/useLoadAnimation";
import { useLocation } from "../../../Hooks/useLocation";
import { useMessage } from "../../../Hooks/useMessage";
import { useFetch } from "../../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

type quicActions = {
  name: string;
  description: string;
  icon?: ReactElement;
};

export const useHomePage = () => {
  const navigate = useNavigate();
  const { setLoadAnimation, runLoadAnimation, loadAnimation } =
    useLoadAnimation();
  const { setLocation } = useLocation();
  const { showMessage, getUserChoice } = useMessage();
  const { postRequest } = useFetch();

  const quickActions: quicActions[] = [
    {
      name: "Report a Crime",
      description: "Report incidents anonymously",
      icon: <HiDocumentReport />,
    },

    {
      name: "Track My Reports",
      description: "Check status of your reports",
      icon: <FaRoute />,
    },
    {
      name: "Safety Tips",
      description: "Stay informed and stay safe",
      icon: <MdHealthAndSafety />,
    },

    {
      name: "Nearby Stations",
      description: "Find security stations near you",
      icon: <FaLocationDot />,
    },
  ];

  const sendSOS = async () => {
    setLoadAnimation({
      state: true,
      message: "Obtaining user location...",
    });
    let location = await setLocation();

    if (typeof location === "string") {
      showMessage({ text: location, status: "warning", timeout: 7000 });
      return;
    }

    if (location.accuracy > 15) {
      console.log("passed here...");
      setLoadAnimation({ state: false });
      showMessage({
        text: "Enter your location",
        status: "normal",
        customRes: true,
      });
      location = await getUserChoice();
      setLoadAnimation({
        state: true,
        message: "Sending SOS...",
      });
    }

    const { response, error } = await postRequest({
      data: {
        incident_type: "emergency",
        location: typeof location === "string" ? location : "SOS",
        latitude: typeof location === "string" ? "" : location.lat,
        longitude: typeof location === "string" ? "" : location.lng,
        description: "Emergency alert!",
        time: String(
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        ),
        date: new Date().toISOString().slice(0, -5).replace("T", " "),
        evidence_provided: false,
        anonymous: false,
        type: "emergency",
      },
      route: "/report",
      type: "object",
    });

    if (error) {
      setLoadAnimation({ state: false });
      showMessage({ text: error, status: "error", timeout: 7000 });
    }

    if (response) {
      setLoadAnimation({ state: false });
      navigate(`/report-status/${response.message}`);
    }
  };

  return {
    quickActions,
    loadAnimation,
    runLoadAnimation,
    setLoadAnimation,
    navigate,
    sendSOS,
  };
};
