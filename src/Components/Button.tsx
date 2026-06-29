import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../utilities/classNames";

export const Button = ({
  children,
  classes = "",
  onClick,
}: {
  children: ReactNode;
  classes?: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      className={cn(
        "text-custom-white",
        "bg-blue-600",
        // "border border-ice",
        "w-60 py-2",
        " text-[16px]",
        "rounded-md outline-none",
        classes,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
