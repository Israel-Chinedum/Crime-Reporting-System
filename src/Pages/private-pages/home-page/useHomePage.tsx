import type { ReactElement } from "react";
import { HiDocumentReport } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { FaRoute } from "react-icons/fa";

type quicActions = {
  name: string;
  description: string;
  icon?: ReactElement;
};

export const useHomePage = () => {
  const quickActions: quicActions[] = [
    {
      name: "Report a Crime",
      description: "Report iincidents anonymously",
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

  return { quickActions };
};
