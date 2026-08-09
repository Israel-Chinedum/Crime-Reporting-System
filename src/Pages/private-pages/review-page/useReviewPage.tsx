import { useRef } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useLoadAnimation } from "../../../Hooks/useLoadAnimation";
import { useLocation } from "../../../Hooks/useLocation";
import { useReport } from "../../../Hooks/useReport";
import { useMessage } from "../../../Hooks/useMessage";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../../utilities/formatTime";
import { useSocket } from "../../../Hooks/useSocket";

export const useReviewPage = () => {
  const { setLocation } = useLocation();
  const socket = useSocket();
  const { formData, getReportData } = useReport();
  const { multipartRequest } = useFetch();
  const { loadAnimation, setLoadAnimation, runLoadAnimation } =
    useLoadAnimation();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const anonymous = useRef(false);

  const sendReport = async () => {
    //   ====== SET LOCATION ======

    setLoadAnimation({ state: true, message: "Sending report..." });

    const newLocation = await setLocation();

    if (typeof newLocation === "string") {
      showMessage({
        text: newLocation,
        status: "warning",
        timeout: 7000,
      });
      setLoadAnimation({ state: false });
      return;
    }

    if (newLocation.accuracy < 15) {
      formData.set("longitude", newLocation.lng);
      formData.set("latitude", newLocation.lat);
    } else {
      formData.set("longitude", "");
      formData.set("latitude", "");
    }

    formData.set("anonymous", `${anonymous.current}`);
    formData.set("type", "normal");

    const reportData = getReportData();

    formData.set("time", formatTime(reportData.time));

    const { response, error } = await multipartRequest({
      form: formData,
      route: "/report",
      type: "formData",
    });

    if (error) {
      setLoadAnimation({ state: false });
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      setLoadAnimation({ state: false });
      navigate(`/report-status/${response.message}`);
      socket.emit("report-sent", { reportId: response.message });
    }
  };

  return { loadAnimation, runLoadAnimation, sendReport, anonymous };
};
