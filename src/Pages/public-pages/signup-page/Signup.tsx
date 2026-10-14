import { Button } from "../../../Components/Button";
import { cn } from "../../../utilities/classNames";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import { FaArrowLeft } from "react-icons/fa";

export const Signup = () => {
  const navigate = useNavigate();
  const { form, password, confirmPassword, matric, postFormData } = useSignup();

  return (
    <section className={cn(" text-custom-white h-dvh flex flex-col")}>
      <Button
        onClick={() => navigate("/")}
        classes="w-max px-4 bg-custom-blue m-2"
      >
        <FaArrowLeft />
      </Button>
      <form
        action=""
        className={cn(
          "flex flex-col gap-4 w-full items-center mx-auto my-auto",
          // above mobile screens
          "mobile:w-max",
        )}
        ref={form}
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
          name="fullname"
        />
        <input
          required
          className={cn("input")}
          type="text"
          placeholder="Department"
          name="department"
        />
        <input
          required
          className={cn("input")}
          type="text"
          placeholder="Matric number"
          name="Matric_Number"
          ref={matric}
        />
        <input
          required
          className={cn("input")}
          type="number"
          placeholder="Phone number"
          name="Phone_Number"
        />
        <input
          required
          className={cn("input")}
          type="email"
          placeholder="Email address"
          name="email"
        />
        <input
          required
          className={cn("input")}
          type="text"
          placeholder="username"
          name="username"
        />
        <input
          required
          className={cn("input")}
          type="password"
          placeholder="password"
          name="password"
          ref={password}
        />
        <input
          required
          className={cn("input")}
          type="password"
          placeholder="Confirm password"
          ref={confirmPassword}
        />
        <Button
          classes="mobile:w-100 w-[95%] smobile:w-[80%]"
          onClick={() => postFormData()}
        >
          Sign up
        </Button>
      </form>
    </section>
  );
};
