import { createContext, useRef, useState, type ReactNode } from "react";
import { cn } from "../utilities/classNames";

export type messageType = {
  text: string;
  status: "success" | "normal" | "warning" | "error" | "pending";
  timeout?: number | null;
  delay?: number;
  pos_x?: "left" | "right" | "mid";
  pos_y?: "top" | "bottom" | "mid";
  noBorder?: boolean;
};

type contextType = {
  showMessage: (arg: messageType) => void;
  closeMessage: () => void;
  message: messageType | null;
};

export const MessageContext = createContext<contextType | null>(null);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<messageType | null>(null);
  const timer = useRef<number>(null);

  const showMessage = ({
    text,
    status,
    timeout = 3000,
    delay = 0,
    pos_x = "mid",
    pos_y = "top",
    noBorder = false,
  }: messageType) => {
    // Check if a timer has been set and clear it
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // setMessage
    setTimeout(() => {
      setMessage({ text, status, pos_x, pos_y, noBorder });
    }, delay);

    if (timeout) {
      timer.current = setTimeout(() => setMessage(null), timeout);
    }
  };

  const closeMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ showMessage, closeMessage, message }}>
      {message && (
        <div
          className={cn(
            "rounded-xl p-3 w-max max-w-[80dvw] absolute bg-deep",
            "left-[50%] translate-x-[-50%] top-[3dvh] lg:text-[1.2rem]",
            "flex items-center gap-1 z-50! text-center",
            // condition for vertical message position
            message.pos_y === "top" && "top-[3dvh]",
            message.pos_y === "mid" && "top-[50dvh] translate-y-[-50%]",
            message.pos_y === "bottom" && "top-[90dvh]",

            // condition for horizontal message positioin
            message.pos_x === "left" && "left-[2%] translate-x-0",
            message.pos_x === "mid" && "left-[50%] translate-x-[-50%]",
            message.pos_x === "right" && "left-[98%] -translate-x-full",

            // condition for message status
            message.status === "normal" && "text-gray-400 border-2",
            message.status === "pending" && "text-gray-400 border-2",
            message.status === "success" &&
              "text-custom-green border-2 border-custom-green",
            message.status === "warning" &&
              "text-custom-orange border-2 border-custom-orange",
            message.status === "error" && "text-accent border-2 border-accent",

            message.noBorder && "border-0 bg-transparent",
          )}
        >
          {message.status === "pending" && (
            <div
              className={cn(
                "w-8 h-8 border-t-3 border-r-3 border-custom-white border-dotted",
                "animate-spin rounded-full",
              )}
            ></div>
          )}
          {message.text}
        </div>
      )}
      {children}
    </MessageContext.Provider>
  );
};
