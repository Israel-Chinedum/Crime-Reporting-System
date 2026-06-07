import { Button } from "../../../Components/Button";
import { cn } from "../../../utilities/classNames";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  return (
    <section className={cn(" text-custom-white h-dvh flex flex-col")}>
      <Button
        onClick={() => navigate("/")}
        classes="w-max px-6 bg-custom-blue m-2 mobile:text-xl text-[16px]"
      >
        Back
      </Button>
      <form
        action=""
        className={cn(
          "flex flex-col gap-4 w-full items-center mx-auto my-auto",
          // above mobile screens
          "mobile:w-max",
        )}
        onSubmit={(e) => e.preventDefault()}
      >
        <h1
          className={cn(
            "text-center text-xl",
            // above mobile screens
            "mobile:text-3xl",
          )}
        >
          User Registration
        </h1>

        <input
          required
          className={cn("input")}
          type="text"
          placeholder="Fullname"
        />
        <input
          required
          className={cn("input")}
          type="text"
          placeholder="Department"
        />
        <input
          required
          className={cn("input")}
          type="number"
          placeholder="Matric number"
        />
        <input
          required
          className={cn("input")}
          type="number"
          placeholder="Phone number"
        />
        <input
          required
          className={cn("input")}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          className={cn("input")}
          type="text"
          placeholder="username"
        />
        <input
          required
          className={cn("input")}
          type="password"
          placeholder="password"
        />
        <input
          required
          className={cn("input")}
          type="password"
          placeholder="Confirm password"
        />
        <Button classes="mobile:w-100 w-[95%] smobile:w-[80%]">Sign up</Button>
      </form>
    </section>
  );
};
