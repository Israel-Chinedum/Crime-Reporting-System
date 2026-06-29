import { FaExclamationTriangle } from "react-icons/fa";
import { cn } from "../../../utilities/classNames";

export const NotFound = () => {
  return (
    <div className={cn("h-dvh flex flex-col justify-center items-center")}>
      <img src="/fpog-logo-Photoroom.png" className={cn("w-100")} alt="" />
      <h1 className={cn("text-4xl text-custom-white font-bold flex gap-4")}>
        <FaExclamationTriangle className={cn("text-custom-orange")} />
        404 Page not found!
      </h1>
    </div>
  );
};
