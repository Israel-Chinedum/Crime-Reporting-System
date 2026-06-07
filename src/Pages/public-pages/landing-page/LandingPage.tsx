import { cn } from "../../../utilities/classNames";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section
      id="login-page"
      className={cn(" text-custom-white h-dvh flex flex-col items-center")}
    >
      <h1
        className={cn(
          // below mobile screens
          "mx-2 text-xl text-center font-bold mb-4 mt-50",
          // above mobile screens
          "mobile:text-3xl",
          // above small tablets
          "sm:text-4xl",
        )}
      >
        FPOG CRIME REPORTING SYSTEM
      </h1>
      <h3
        className={cn(
          // below mobile screens
          "font-bold text-center",
          // above mobile screens
          "mobile:text-xl",
        )}
      >
        Report. Respond, Protect.
      </h3>
      <h3
        className={cn(
          // below mobile screens
          "text-center",
          // above mobile screens
          "mobile:text-xl",
        )}
      >
        Together for a safer campus community.
      </h3>

      <div
        id="buttons"
        className={cn(
          // below mobile screens
          "mt-20 flex flex-wrap justify-center gap-2 w-full px-7",
          // above mobile screens
          "mobile:flex-nowrap mobile:w-max",
        )}
      >
        <Button
          onClick={() => navigate("/login")}
          classes="w-full mobile:w-45 sm:w-60 py-2 mobile:py-3"
        >
          Sign in
        </Button>
        <Button
          onClick={() => navigate("/signup")}
          classes="w-full mobile:w-45 sm:w-60 py-2 mobile:py-3 bg-custom-blue"
        >
          Sign up
        </Button>
      </div>

      <p className={cn("mt-auto mb-5 mobile:mb-10 sm:mb-20 mobile:text-xl")}>
        Your safety. Our priority
      </p>
    </section>
  );
};
