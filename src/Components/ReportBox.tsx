import { FaX } from "react-icons/fa6";
import { cn } from "../utilities/classNames";
import { Button } from "./Button";
import { useState } from "react";

export type reportBoxType = {
  reportId: string;
  incident_type: string;
  date: string;
  time: string;
  location: string;
  actual_location: string;
  description: string;
  reported_by: string;
  evidence_provided: boolean;
  fileMetaData: { name: string; mimetype: string };
  updateReport?: (arg: {
    message: string;
    action: "resolved" | "active" | "delete";
    reportId: string;
  }) => Promise<void>;
};

export const useReportBox = ({ controls = true }: { controls?: boolean }) => {
  const [showBox, setShowBox] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  const runShowBox = ({
    reportId,
    incident_type,
    date,
    time,
    location,
    actual_location,
    description,
    reported_by,
    evidence_provided,
    fileMetaData,
    updateReport,
  }: reportBoxType) => {
    return (
      <div
        className={cn(
          "text-white bg-dark px-10 py-15 rounded-xl gap-4 grid ml-20 absolute z-10",
          evidence_provided && "grid-cols-2",
        )}
      >
        {/* ====== REPORT DETAILS ====== */}
        <div className={cn(" col-span-2 flex items-center justify-between")}>
          <h1 className={cn("text-xl font-bold w-max ")}>REPORT DETAILS</h1>
          <FaX
            className={cn(
              "font-bold text-xl translate-x-[-300%] hover:text-accent",
            )}
            onClick={() => setShowBox(false)}
          />
        </div>
        <div>
          <ul
            className={cn(
              "flex flex-col gap-5",
              "[&>li>label]:text-gray-400 [&>li>label]:text-[1.07rem]",
              "[&>li>p]:text-[1.2rem] [&>li]:border-t [&>li]:border-t-gray-700",
            )}
          >
            {/* ====== ReportId ====== */}
            <li className={cn("border-none")}>
              <label htmlFor="">Report ID</label>
              <p>{reportId}</p>
            </li>

            {/* ====== Incident Type ====== */}
            <li>
              <label htmlFor="">Type of Incident</label>
              <p>{incident_type}</p>
            </li>

            {/* ====== Date & Time ====== */}
            <li>
              <label htmlFor="">Date & Time</label>
              <p>
                <span>{new Date(date).toLocaleDateString()}</span>{" "}
                <span>{time}</span>
              </p>
            </li>

            {/* ====== Location ====== */}
            <li>
              <label htmlFor="">Location provided</label>
              <p>{location}</p>
            </li>

            {/* ====== Actual Location ====== */}
            <li>
              <label htmlFor="">Actual location</label>
              <p>{actual_location}</p>
            </li>

            {/* ====== Description ====== */}
            <li className={cn("font-normal flex flex-col")}>
              <label htmlFor="">Description</label>
              <textarea
                defaultValue={description}
                id=""
                className={cn("bg-navy w-140 h-50 p-2 resize-none")}
              ></textarea>
            </li>

            {/* ====== Reported By ====== */}
            <li>
              <label htmlFor="">Reported By</label>
              <p>{reported_by}</p>
            </li>
          </ul>
        </div>

        {/* ====== REPORT EVIDENCE ====== */}
        {evidence_provided && (
          <div>
            <div className={cn("w-max justify-self-end")}>
              <h1 className={cn("text-xl font-bold mb-5")}>Evidence</h1>
              <h2 className={cn("mb-2")}>
                {fileMetaData?.mimetype.includes("image")
                  ? "Image"
                  : fileMetaData?.mimetype.includes("audio")
                    ? "Audio"
                    : "Video"}
              </h2>
              <div
                id="evidence-holder"
                className={cn("bg-deep w-120 h-90 rounded-md overflow-hidden")}
              >
                {fileMetaData?.mimetype.includes("image") && (
                  <img src={src!} className={cn("max-w-full max-h-full")} />
                )}
                {fileMetaData?.mimetype.includes("audio") && (
                  <audio controls src={src!}></audio>
                )}
                {fileMetaData?.mimetype.includes("video") && (
                  <video
                    controls
                    src={src!}
                    className={cn("w-full h-full")}
                  ></video>
                )}
              </div>
              <h2>{fileMetaData?.name}</h2>
            </div>
          </div>
        )}

        {/* ====== BUTTONS ====== */}
        {controls && updateReport && (
          <div className={cn("col-span-2 grid grid-cols-3 w-max gap-2")}>
            {/* Resolve button */}
            <Button
              onClick={() => {
                updateReport({
                  message: "You are about to resolve this case!",
                  action: "resolved",
                  reportId: reportId,
                });
              }}
              classes="bg-custom-green"
            >
              Resolve
            </Button>

            {/* Activate button */}
            <Button
              onClick={() => {
                updateReport({
                  message: "You are about to activate this case!",
                  action: "active",
                  reportId: reportId,
                });
              }}
              classes="bg-custom-orange"
            >
              Activate
            </Button>

            {/* Delete button */}
            <Button
              onClick={() => {
                updateReport({
                  message: "You are about to delete this report!",
                  action: "delete",
                  reportId: reportId,
                });
              }}
              classes="bg-accent"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    );
  };

  return { showBox, setSrc, setShowBox, runShowBox };
};
