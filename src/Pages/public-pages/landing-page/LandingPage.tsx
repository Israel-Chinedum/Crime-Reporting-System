import { cn } from "../../../utilities/classNames";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { FaUserGear, FaX } from "react-icons/fa6";
import { useState } from "react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [selectLogin, setSelectLogin] = useState(false);

  return (
    <section
      id="login-page"
      className={cn(
        "text-custom-white h-dvh flex flex-col items-center relative",
      )}
    >
      <div
        className={cn(
          "bg-[url('/landing-page.png')] w-full h-full bg-cover bg-center absolute z-[-1] opacity-5",
          "bg-size-[250%_100%] sm:bg-auto bg-no-repeat",
        )}
      ></div>

      <div
        className={cn(
          "w-50 mobile:w-70 sm:w-100 h-[50dvh] flex flex-col justify-center",
        )}
      >
        <img
          src="/fpog-logo.png"
          className={cn("w-50 mobile:w-70 sm:w-100")}
          alt=""
        />
      </div>
      <h1
        className={cn(
          // below mobile screens
          "mx-2 text-xl text-center font-bold mb-4",
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
        <div
          className={cn(
            "absolute bg-deep px-4 py-8 rounded-xl flex flex-col items-center w-[90%] mobile:w-90 gap-4 border-2 shadow-xl",
            "top-[50%] left-[50%] translate-[-50%] select-none",
            !selectLogin && "opacity-0 pointer-events-none",
          )}
        >
          <FaX
            className={cn("ml-auto mb-auto hover:text-accent")}
            onClick={() => setSelectLogin(false)}
          />
          <div className={cn("flex items-center gap-4 justify-center")}>
            <FaSignInAlt className={cn("text-3xl")} />
            <h1 className={cn("text-2xl font-bold text-center")}>
              Select login type
            </h1>
          </div>
          <div
            className={cn(
              "border p-2 rounded-md w-full flex items-center gap-4",
              "bg-blue-600 cursor-auto",
            )}
            onClick={() => navigate("/login")}
          >
            <FaUser className={cn("text-4xl")} />
            <h2 className={cn("text-xl")}>User Login</h2>
          </div>
          <div
            className={cn(
              "border p-2 rounded-md w-full flex items-center gap-4",
              "bg-blue-600 cursor-auto",
            )}
            onClick={() => navigate("/admin-login")}
          >
            <FaUserGear className={cn("text-4xl")} />
            <h2 className={cn("text-xl")}>Admin Login</h2>
          </div>
        </div>
        <Button
          onClick={() => setSelectLogin(true)}
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
