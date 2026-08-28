import { useRef, useState } from "react";
import { cn } from "../utilities/classNames";
import { Button } from "./Button";
import { useFetch } from "../Hooks/useFetch";
import { useMessage } from "../Hooks/useMessage";

export const SelectImageBox = ({
  setSelectImage,
  setProfileImgSrc,
}: {
  setSelectImage: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileImgSrc?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const { multipartRequest, getRequest } = useFetch();
  const { showMessage, closeMessage } = useMessage();

  const file = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgName, setImgName] = useState<string>("");

  const selectImage = (e: any) => {
    const imgFile = e.target.files[0];
    const src = URL.createObjectURL(imgFile);
    setImgSrc(src);
    setImgName(imgFile.name);
  };

  const sendImage = async () => {
    if (file.current?.files) {
      showMessage({
        text: "Updating profile picture...",
        status: "pending",
        timeout: null,
      });
      const formData = new FormData();
      formData.set("file", file.current?.files[0]);
      const { error, response } = await multipartRequest({
        form: formData,
        type: "formData",
        route: "/user/set-profile-pic",
      });
      if (error) {
        showMessage({ text: error, status: "error" });
      }
      if (response) {
        showMessage({ text: response.message, status: "success" });
        setTimeout(async () => {
          showMessage({
            text: "Fetching profile picture...",
            status: "pending",
            timeout: null,
          });

          const { error, response } = await getRequest(
            "/user/get-user-profile-pic",
          );
          if (error) {
            showMessage({ text: error, status: "error", timeout: 7000 });
          }
          if (response) {
            setProfileImgSrc && setProfileImgSrc(response.url);
            setSelectImage(false);
            closeMessage();
          }
        }, 3000);
      }
    } else {
      showMessage({ text: "File not found!", status: "warning" });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 absolute bg-dark z-20 shadow-2xl w-[80%]",
        "p-10 rounded-md justify-center items-center ml-[50%] translate-x-[-50%]",
        "lg:w-max",
      )}
    >
      <input
        onChange={(e) => selectImage(e)}
        ref={file}
        className={cn("hidden")}
        type="file"
        accept=".jpg, .jpeg, .png"
      />

      <div
        className={cn(
          "w-50 h-50 rounded-full border-2 border-deep flex justify-center items-center",
          "overflow-hidden",
        )}
      >
        <img src={imgSrc!} alt="" className={cn("w-full h-full")} />
      </div>

      <h2>{imgName}</h2>
      <div
        className={cn(
          "flex flex-wrap gap-2 w-full justify-center items-center",
        )}
      >
        <Button
          classes="w-50 bg-custom-green"
          onClick={() => file.current?.click()}
        >
          Select image
        </Button>
        <Button
          classes="w-50"
          onClick={() => {
            sendImage();
          }}
        >
          Set pic
        </Button>
        <Button
          classes="w-50 bg-custom-orange"
          onClick={() => setSelectImage(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
