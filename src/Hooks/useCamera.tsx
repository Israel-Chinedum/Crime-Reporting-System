import { useRef, useState } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>(null);
  const recorderRef = useRef<MediaRecorder>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("No evidence has been uploaded");

  const setFilesToDefault = () => {
    setImage(null);
    setImageFile(null);
    setVideoFile(null);
    setAudioFile(null);
  };

  //  ====== START CAMERA ======
  const startMedia = async (media: "camera" | "mic") => {
    setFilesToDefault();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: media === "camera",
      audio: true,
    });

    streamRef.current = stream;

    if (media === "camera") {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  //   ====== STOP CAMERA ======
  const stopMedia = (media: "camera" | "mic") => {
    const stream = streamRef.current;

    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());

    streamRef.current = null;
    if (media === "camera") {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  //   ====== TAKE PHOTO ======
  const takePhoto = async () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    const ctx = canvas?.getContext("2d");

    canvas.width = video?.videoWidth!;
    canvas.height = video?.videoHeight!;

    ctx?.drawImage(video!, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setImage(dataUrl);
    stopMedia("camera");

    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const _filename = `photo-evidence-${Date.now()}`;

    setFilename(_filename);

    const file = new File([blob], _filename, {
      type: blob.type,
    });

    setImageFile(file);
  };

  //   ====== START RECORDING ======
  const startRecording = (media: "video" | "audio") => {
    const stream = streamRef.current;
    if (!stream) return;

    chunksRef.current = [];

    const recorder = new MediaRecorder(stream);

    recorderRef.current = recorder;

    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: media === "video" ? "video/webm" : "audio/mp3",
      });

      const _filename = `${media}-evidence-${Date.now()}`;

      setFilename(_filename);

      const file = new File([blob], _filename, {
        type: blob.type,
      });

      media === "video" ? setVideoFile(file) : setAudioFile(file);
    };
    recorder.start();
  };

  //   ====== STOP RECORDING ======
  const stopRecording = (media: "camera" | "mic") => {
    recorderRef.current?.stop();
    stopMedia(media);
  };

  return {
    startMedia,
    stopMedia,
    videoRef,
    takePhoto,
    image,
    stopRecording,
    startRecording,
    videoFile,
    audioFile,
    imageFile,
    filename,
    setFilename,
    setFilesToDefault,
    setAudioFile,
    setVideoFile,
    setImageFile,
  };
};
