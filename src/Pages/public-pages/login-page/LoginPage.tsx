import { cn } from "../../../utilities/classNames";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <section className={cn(" h-dvh text-custom-white flex flex-col")}>
      <Button
        onClick={() => navigate("/")}
        classes="bg-custom-blue w-max px-4 m-2 text-[16px] mobile:text-xl"
      >
        Back
      </Button>
      <form
        action=""
        className={cn(
          "m-auto flex flex-col gap-3 w-full mobile:w-max items-center",
        )}
      >
        <h1 className={cn("mobile:text-3xl text-2xl text-center")}>
          User Login
        </h1>
        <input
          type="text"
          placeholder="username"
          required
          className={cn("input text-[16px] mobile:text-xl")}
        />
        <input
          type="text"
          className={cn("input text-[16px] mobile:text-xl")}
          placeholder="password"
        />
        <Button classes="mobile:w-full smobile:w-[80%] w-[95%] text-[16px] mobile:text-xl ">
          Login
        </Button>
        <Button classes="w-[95%] mobile:w-full smobile:w-[80%] bg-custom-blue text-[16px] mobile:text-xl">
          Forgot password
        </Button>
      </form>
    </section>
  );
};
