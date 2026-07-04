import { cn } from "../../../utilities/classNames";
import { InAppHeader } from "../../../Components/InAppHeader";
import { Stepper } from "../../../Components/Stepper";
import { Button } from "../../../Components/Button";
import { SideBar } from "../../../Components/SideBar";
import { useAddEvidence } from "./useAddEvidence";
import { useState } from "react";
import { useCamera } from "../../../Hooks/useCamera";
import { FaCamera, FaMicrophone, FaPause, FaVideo } from "react-icons/fa";

export const AddEvidence = () => {
  const { form, evidenceMedia } = useAddEvidence();

  const {
    startMedia,
    videoRef,
    takePhoto,
    image,
    startRecording,
    stopRecording,
    videoFile,
    audioFile,
    filename,
  } = useCamera();

  const [recording, setRecording] = useState(false);
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [mediaType, setMediaType] = useState<"photo" | "video" | "audio">(
    "photo",
  );

  return (
    <div
      className={cn(
        "flex h-dvh overflow-y-auto",
        "sm:flex-row",
        "flex-col-reverse",
      )}
    >
      {/* ====== HIDDEN FORM ====== */}
      <form ref={form} action="" className={cn("hidden")}>
        <input id="evidence-file" type="file" name="file" />
      </form>

      <SideBar active={"home"} classes="hidden sm:block" />
      <section
        className={cn(
          "overflow-y-auto flex flex-col p-3 h-dvh text-custom-white",
          "w-full",
        )}
      >
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
                // const file = document.getElementById("evidence-file");
                if (medium.type === "take-photo") {
                  setMediaType("photo");
                  await startMedia("camera");
                  setRecording(true);
                }
                if (medium.type === "record-video") {
                  setMediaType("video");
                  await startMedia("camera");
                  setRecording(true);
                }
                if (medium.type === "record-audio") {
                  setMediaType("audio");
                  await startMedia("mic");
                  startRecording("audio");
                  setRecording(true);
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

        <div className={cn("mt-10 mb-5 p-4 bg-deep rounded-md")}>
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
          {image && <img src={image} alt="" className={cn("w-80")} />}
          {videoFile && (
            <video
              className={cn("w-80 h-55 bg-black")}
              controls
              src={URL.createObjectURL(videoFile)}
            ></video>
          )}
          {audioFile && (
            <audio controls src={URL.createObjectURL(audioFile)}></audio>
          )}
          {filename}
        </div>

        <Button classes="w-full mobile:w-60 mt-auto mobile:ml-auto">
          Next
        </Button>
      </section>
    </div>
  );
};
