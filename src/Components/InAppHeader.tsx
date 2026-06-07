import { FaArrowLeft } from "react-icons/fa";
import { cn } from "../utilities/classNames";
import { useNavigate } from "react-router-dom";

export const InAppHeader = ({
  content,
  arrowClasses,
  headerClasses,
  routeBack,
}: {
  content: string;
  arrowClasses?: string;
  headerClasses?: string;
  routeBack: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className={cn("flex items-center justify-center ")}>
      <FaArrowLeft
        className={cn("mr-auto", arrowClasses)}
        onClick={() => navigate(routeBack)}
      />
      <h1 className={cn("mr-auto font-bold text-xl", headerClasses)}>
        {content}
      </h1>
    </div>
  );
};
