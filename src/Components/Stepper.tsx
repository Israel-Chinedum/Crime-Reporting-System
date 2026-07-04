import { cn } from "../utilities/classNames";

export const Stepper = ({
  progressIndex = 1,
  bgColor,
  progressColor = "bg-custom-green",
  numberOfSteps = 4,
}: {
  progressIndex: number;
  bgColor: string;
  progressColor?: string;
  numberOfSteps?: number;
}) => {
  const steps: number[] = [];

  for (let i = 0; i < numberOfSteps; i++) {
    steps.push(i + 1);
  }

  return (
    <div className={cn("h-10 relative flex justify-between shrink-0")}>
      {/* ====== line ====== */}
      <div
        className={cn(
          "border border-gray-400 absolute w-full top-[50%] translate-y-[-50%] h-0",
        )}
      ></div>

      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            bgColor,
            "h-full z-1 w-10 border border-gray-400 rounded-full flex justify-center items-center",
            index + 1 <= progressIndex && progressColor,
          )}
        >
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
};
