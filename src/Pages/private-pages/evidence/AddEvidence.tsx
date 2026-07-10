import { cn } from "../../../utilities/classNames";
import { InAppHeader } from "../../../Components/InAppHeader";
import { Stepper } from "../../../Components/Stepper";
import { Button } from "../../../Components/Button";
import { SideBar } from "../../../Components/SideBar";
import { useAddEvidence } from "./useAddEvidence";
import { useEffect, useState } from "react";
import { useCamera } from "../../../Hooks/useCamera";
import { FaCamera, FaMicrophone, FaPause, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AddEvidence = () => {
  const { file, setFile, evidenceMedia, reportData, removeFile } =
    useAddEvidence();
  const navigate = useNavigate();

  const {
    startMedia,
    videoRef,
    takePhoto,
    image,
    startRecording,
    stopRecording,
    videoFile,
    audioFile,
    imageFile,
    filename,
    setFilename,
    setFilesToDefault,
    setAudioFile,
    setVideoFile,
    setImageFile,
  } = useCamera();

  const [recording, setRecording] = useState(false);
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [displayUrl, setDisplayUrl] = useState<{
    url: string;
    type: "video" | "audio" | "image";
  } | null>(null);
  const [mediaType, setMediaType] = useState<"photo" | "video" | "audio">(
    "photo",
  );

  useEffect(() => {
    if (reportData.file) {
      const url = URL.createObjectURL(reportData.file);
      setDisplayUrl({
        url,
        type: reportData.file.type.split("/")[0],
      });
      setFilename(reportData.file.name);
      if (reportData.file.type.includes("audio")) {
        setAudioFile(reportData.file);
      }
      if (reportData.file.type.includes("video")) {
        setVideoFile(reportData.file);
      }
      if (reportData.file.type.includes("image")) {
        setImageFile(reportData.file);
      }
    }
  }, []);

  const setUrl = () => {
    if (file.current?.files) {
      const displayFile = file.current?.files[0];
      const url = URL.createObjectURL(displayFile);
      setFilename(displayFile.name);
      if (displayFile.type.includes("image")) {
        setDisplayUrl({
          url,
          type: "image",
        });
      }
      if (displayFile.type.includes("video")) {
        setDisplayUrl({
          url,
          type: "video",
        });
      }
      if (displayFile.type.includes("audio")) {
        setDisplayUrl({
          url,
          type: "audio",
        });
      }
    }
  };

  return (
    <div
      className={cn(
        "flex h-dvh overflow-y-auto",
        "sm:flex-row",
        "flex-col-reverse",
      )}
    >
      {/* ====== HIDDEN FILE ====== */}

      <input
        ref={file}
        onChange={setUrl}
        id="evidence-file"
        type="file"
        name="file"
        className={cn("hidden")}
      />

      <SideBar active={"home"} classes="hidden sm:block" />
      <section
        className={cn(
          "overflow-y-auto flex flex-col p-3 h-dvh text-custom-white",
          "w-full",
        )}
      >
        <div className={cn("w-full")}>
          {/* ====== HEADER ====== */}
          <InAppHeader content="Report a Crime" routeBack="/incident-details" />

          {/* ====== SEPARATOR ====== */}
          <div className={cn("my-8")}></div>

          {/* ====== STEPPER ====== */}
          <Stepper
            progressIndex={2}
            bgColor="bg-navy"
            progressColor="bg-blue-600"
          />
        </div>

        {/* ====== ADD EVIDENCE ====== */}
        <h1 className={cn("font-bold mt-10 text-xl")}>
          2. Add Evidence (Optional)
        </h1>
        <p className={cn("mt-2")}>
          Upload a photo, video or an audio as evidence.
        </p>
        <p className={cn("text-gray-400")}>
          Note only one evidence file can be uploaded per report!
        </p>

        {/* ====== TYPES OF EVIDENCE ====== */}
        <div
          className={cn(
            "mt-10 gap-2 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]",
          )}
        >
          {evidenceMedia.map((medium, index) => (
            <div
              key={index}
              className={cn(
                "bg-deep rounded-md p-3 flex flex-col items-center gap-2",
                "cursor-default",
              )}
              // ====== START MEDIA ======
              onClick={async () => {
                if (medium.type === "take-photo") {
                  file.current?.value && (file.current.value = "");
                  setDisplayUrl(null);
                  setMediaType("photo");
                  await startMedia("camera");
                  setRecording(true);
                }
                if (medium.type === "record-video") {
                  file.current?.value && (file.current.value = "");
                  setDisplayUrl(null);
                  setMediaType("video");
                  await startMedia("camera");
                  setRecording(true);
                }
                if (medium.type === "record-audio") {
                  file.current?.value && (file.current.value = "");
                  setDisplayUrl(null);
                  setMediaType("audio");
                  await startMedia("mic");
                  startRecording("audio");
                  setRecording(true);
                }
                if (medium.type === "photo") {
                  setFilesToDefault();
                  file.current?.setAttribute("accept", ".jpeg, .png, .jpg");
                  file.current?.click();
                }
                if (medium.type === "video") {
                  setFilesToDefault();
                  file.current?.setAttribute("accept", ".mp4, .mkv");
                  file.current?.click();
                }
                if (medium.type === "audio") {
                  setFilesToDefault();
                  file.current?.setAttribute("accept", ".mp3");
                  file.current?.click();
                }
                // file?.click();
              }}
            >
              <span className={cn("text-4xl text-custom-green")}>
                {medium.icon}
              </span>
              <p>{medium.description}</p>
            </div>
          ))}
        </div>

        <div className={cn("mt-10 mb-5 p-4 bg-deep rounded-md flex flex-col")}>
          <div
            className={cn(
              "absolute w-[90dvw] h-[90dvh] bg-black top-[5dvh] left-[5dvw]",
              "z-10",
              !recording && "hidden",
            )}
          >
            {mediaType !== "audio" && (
              <video
                autoPlay
                playsInline
                muted
                ref={videoRef}
                className={cn("w-full h-full")}
              ></video>
            )}
            {mediaType === "audio" && (
              <FaMicrophone
                className={cn(
                  "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ",
                  "text-[5rem] mobile:text-[10rem] lg:text-[15rem] xl:text-[20rem]",
                )}
              />
            )}
            <Button
              classes="absolute top-full left-[50%] -translate-x-[50%] -translate-y-[150%] w-max p-4 rounded-full"
              onClick={() => {
                if (mediaType === "photo") {
                  takePhoto();
                  setRecording(false);
                } else if (mediaType === "video") {
                  if (!recordingVideo) {
                    startRecording("video");
                    setRecordingVideo(true);
                  } else {
                    stopRecording("camera");
                    setRecordingVideo(false);
                    setRecording(false);
                  }
                } else {
                  stopRecording("mic");
                  setRecording(false);
                }
              }}
            >
              {mediaType === "photo" && (
                <FaCamera className={cn("mobile:text-2xl")} />
              )}
              {mediaType === "video" && (
                <FaVideo
                  className={cn(
                    "mobile:text-2xl",
                    recordingVideo && "text-accent",
                  )}
                />
              )}
              {mediaType === "audio" && <FaPause />}
            </Button>
          </div>
          <div className={cn("mx-auto mobile:mx-0")}>
            {(image || displayUrl?.type === "image") && (
              <img
                src={image ? image : displayUrl?.url}
                alt=""
                className={cn("w-80 max-w-full mobile:max-w-120 max-h-150")}
              />
            )}
            {(videoFile || displayUrl?.type === "video") && (
              <video
                className={cn("w-80 h-55 bg-black")}
                controls
                src={
                  videoFile ? URL.createObjectURL(videoFile) : displayUrl?.url
                }
              ></video>
            )}
            {(audioFile || displayUrl?.type === "audio") && (
              <audio
                controls
                src={
                  audioFile ? URL.createObjectURL(audioFile) : displayUrl?.url
                }
              ></audio>
            )}
          </div>
          {filename}
        </div>
        <div className={cn("mt-auto mobile:ml-auto flex justify-center gap-2")}>
          <Button
            classes={
              audioFile || videoFile || imageFile || file.current?.value
                ? "w-full mobile:w-60 mt-auto mobile:ml-auto bg-gray-700"
                : "hidden"
            }
            onClick={() => {
              setFilesToDefault();
              file.current && (file.current.value = "");
              setDisplayUrl(null);
              setFilename("No evidence has been uploaded");
              removeFile();
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              if (audioFile) {
                setFile(audioFile);
              }
              if (videoFile) {
                setFile(videoFile);
              }
              if (imageFile) {
                setFile(imageFile);
              }
              if (!audioFile && !videoFile && !imageFile) {
                setFile();
              }
              navigate("/review");
            }}
            classes={
              audioFile || videoFile || imageFile || file.current?.value
                ? "w-full mobile:w-60 mt-auto mobile:ml-auto"
                : "w-full mobile:w-60 mt-auto mobile:ml-auto bg-gray-700"
            }
          >
            {audioFile || videoFile || imageFile || file.current?.value
              ? "Next"
              : "Skip"}
          </Button>
        </div>
      </section>
    </div>
  );
};
