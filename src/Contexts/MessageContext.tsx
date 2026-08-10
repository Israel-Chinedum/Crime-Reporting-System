import { createContext, useRef, useState, type ReactNode } from "react";
import { cn } from "../utilities/classNames";
import { Button } from "../Components/Button";

export type messageType = {
  text: string;
  status: "success" | "normal" | "warning" | "error" | "pending";
  timeout?: number | null;
  delay?: number;
  pos_x?: "left" | "right" | "mid";
  pos_y?: "top" | "bottom" | "mid";
  noBorder?: boolean;
  question?: boolean;
  customRes?: boolean;
};

type contextType = {
  showMessage: (arg: messageType) => void;
  closeMessage: () => void;
  message: messageType | null;
  getUserChoice: () => Promise<unknown>;
};

export const MessageContext = createContext<contextType | null>(null);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<messageType | null>(null);
  const timer = useRef<number>(null);
  const customResMsg = useRef<string>("");

  const userChoice = useRef<any>(null);

  const showMessage = ({
    text,
    status,
    timeout = 3000,
    delay = 0,
    pos_x = "mid",
    pos_y = "top",
    noBorder = false,
    question = false,
    customRes = false,
  }: messageType) => {
    // Check if a timer has been set and clear it
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (question || customRes) {
      timeout = null;
    }

    // setMessage
    setTimeout(() => {
      setMessage({ text, status, pos_x, pos_y, noBorder, question, customRes });
    }, delay);

    if (timeout) {
      timer.current = setTimeout(() => setMessage(null), timeout);
    }
  };

  const closeMessage = () => {
    setMessage(null);
  };

  const getUserChoice = () => {
    return new Promise((resolve) => {
      userChoice.current = resolve;
    });
  };

  return (
    <MessageContext.Provider
      value={{
        showMessage,
        closeMessage,
        message,
        getUserChoice,
      }}
    >
      {message && (
        <div
          className={cn(
            "rounded-xl p-3 w-max max-w-[80dvw] absolute bg-deep",
            "left-[50%] translate-x-[-50%] top-[3dvh] 2xl:text-[1.2rem]",
            "flex flex-col justify-center items-center gap-1 z-50! wrap-break-word text-center",
            message.status === "pending" && "flex-row",
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
          {message.status === "pending" && !message.question && (
            <div
              className={cn(
                "w-8 h-8 border-t-3 border-r-3 border-custom-white border-dotted",
                "animate-spin rounded-full",
              )}
            ></div>
          )}
          {message.text}
          {message.question && (
            <div className={cn("flex gap-2 mt-3")}>
              <Button
                onClick={() => {
                  userChoice.current(false);
                  closeMessage();
                }}
                classes="bg-gray-400 w-max px-10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  userChoice.current(true);
                  closeMessage();
                }}
                classes="w-max px-10"
              >
                Confirm
              </Button>
            </div>
          )}
          {message.customRes && (
            <div className={cn("flex flex-col gap-4")}>
              <input
                className={cn("p-2 border-b outline-none")}
                type="text"
                placeholder="Here..."
                onChange={(e) => {
                  customResMsg.current = e.target.value;
                }}
              />
              <Button
                onClick={() => {
                  userChoice.current(customResMsg.current);
                  closeMessage();
                }}
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      )}
      {children}
    </MessageContext.Provider>
  );
};
