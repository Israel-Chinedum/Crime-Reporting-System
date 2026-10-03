import { useState } from "react";
import { cn } from "../utilities/classNames";

export const useLoadAnimation = () => {
  const [loadAnimation, setLoadAnimation] = useState<{
    state: boolean;
    message?: string;
  }>({
    state: false,
    message: "",
  });

  const runLoadAnimation = () => {
    return (
      <div
        className={cn(
          "absolute w-dvw h-dvh bg-black/50",
          "flex justify-center items-center gap-2",
          "z-50 text-white",
        )}
      >
        <div
          className={cn("bg-dark rounded-md px-4 py-2 flex gap-4 items-center")}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full border-t-5 border-l-5 border-dotted border-white",
              "animate-spin [animation-duration:0.5s]",
            )}
          ></div>
          {loadAnimation.message}
        </div>
      </div>
    );
  };

  return { loadAnimation, setLoadAnimation, runLoadAnimation };
};
