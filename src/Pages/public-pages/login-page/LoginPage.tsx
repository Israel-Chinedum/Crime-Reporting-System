import { cn } from "../../../utilities/classNames";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";
import { FaArrowLeft } from "react-icons/fa";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    username,
    password,
    postFormData,
    loadAnimation,
    runLoadAnimation,
    forgotPassword,
  } = useLogin();

  return (
    <section className={cn(" h-dvh text-custom-white flex flex-col relative")}>
      <div
        className={cn(
          "absolute bg-[url('/fpog-logo.png')] w-full h-full bg-no-repeat",
          "bg-center z-[-1] opacity-10 bg-size-[150%_80%] sm:bg-auto",
        )}
      ></div>
      {loadAnimation.state && runLoadAnimation()}
      <Button
        onClick={() => navigate("/")}
        classes="bg-custom-blue w-max px-4 m-2 text-[16px]"
      >
        <FaArrowLeft />
      </Button>

      <form
        action=""
        className={cn(
          "m-auto flex flex-col gap-3 w-full mobile:w-max items-center",
        )}
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className={cn("mobile:text-3xl text-2xl text-center")}>
          User Login
        </h1>
        <input
          type="text"
          placeholder="username"
          required
          className={cn("input text-[16px] mobile:text-xl")}
          ref={username}
        />
        <input
          type="password"
          className={cn("input text-[16px] mobile:text-xl")}
          placeholder="password"
          ref={password}
        />
        <Button
          classes="mobile:w-full smobile:w-[80%] w-[95%] text-[16px] mobile:text-xl"
          onClick={() => postFormData()}
        >
          Login
        </Button>
        <Button
          onClick={forgotPassword}
          classes="w-[95%] mobile:w-full smobile:w-[80%] bg-custom-blue text-[16px] mobile:text-xl"
        >
          Forgot password
        </Button>
      </form>
    </section>
  );
};
