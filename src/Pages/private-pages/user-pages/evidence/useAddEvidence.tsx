import { useRef } from "react";
import { useReport } from "../../../../Hooks/useReport";
import {
  FaCamera,
  FaVideo,
  FaMicrophone,
  FaFileVideo,
  FaFileAudio,
} from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";

export const useAddEvidence = () => {
  const evidenceMedia = [
    {
      description: "Take a Photo",
      icon: <FaCamera />,
      type: "take-photo",
    },
    {
      description: "Choose a Photo",
      icon: <FaPhotoFilm />,
      type: "photo",
    },
    {
      description: "Record Video",
      icon: <FaVideo />,
      type: "record-video",
    },
    {
      description: "Choose a Video",
      icon: <FaFileVideo />,
      type: "video",
    },
    {
      description: "Record Audio",
      icon: <FaMicrophone />,
      type: "record-audio",
    },
    {
      description: "Choose an Audio File",
      icon: <FaFileAudio />,
      type: "audio",
    },
  ];

  const { addFile, getReportData, removeFile } = useReport();

  const reportData = getReportData();

  const file = useRef<HTMLInputElement>(null);

  const setFile = (paramFile?: File) => {
    if (paramFile) {
      addFile(paramFile);
      return true;
    } else if (file.current?.value && file.current.files) {
      addFile(file.current.files[0]);
      return true;
    }
    return false;
  };

  return { setFile, file, evidenceMedia, reportData, removeFile };
};
