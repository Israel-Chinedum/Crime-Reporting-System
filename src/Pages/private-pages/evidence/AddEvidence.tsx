import { cn } from "../../../utilities/classNames";
import { InAppHeader } from "../../../Components/InAppHeader";
import { Stepper } from "../../../Components/Stepper";
import { FaCamera, FaVideo, FaMicrophone } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { Button } from "../../../Components/Button";
import { SideBar } from "../../../Components/SideBar";

export const AddEvidence = () => {
  const evidenceMedia = [
    {
      description: "Take a Photo",
      icon: <FaCamera />,
    },
    {
      description: "Choose a Photo",
      icon: <FaPhotoFilm />,
    },
    {
      description: "Record Video",
      icon: <FaVideo />,
    },
    {
      description: "Record Audio",
      icon: <FaMicrophone />,
    },
  ];

  return (
    <div className={cn("flex h-dvh", "sm:flex-row", "flex-col-reverse")}>
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
        <p className={cn("mt-2")}>Upload photos, videos or audio as evidence</p>

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
              )}
            >
              <span className={cn("text-4xl text-custom-green")}>
                {medium.icon}
              </span>
              <p>{medium.description}</p>
            </div>
          ))}
        </div>

        <div className={cn("mt-10 mb-5 p-4 bg-deep rounded-md")}>
          Nothing has been uploaded
        </div>

        <Button classes="w-full mobile:w-60 mt-auto">Next</Button>
      </section>
    </div>
  );
};
