import { InAppHeader } from "../../../Components/InAppHeader";
import { cn } from "../../../utilities/classNames";
import { FaPen } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Button } from "../../../Components/Button";
import { SideBar } from "../../../Components/SideBar";

export const ProfilePage = () => {
  return (
    <div className={cn("flex h-dvh flex-col-reverse sm:flex-row")}>
      <SideBar active="profile" classes="sm:block" />
      <section className={cn("w-full text-custom-white p-3 overflow-auto")}>
        <InAppHeader
          content="User Profile"
          routeBack="/home"
          arrowClasses="mobile:hidden"
          headerClasses="mobile:mr-0"
        />
        {/* ====== USER PROFILE ====== */}
        <div>
          {/* ====== profile display ====== */}
          <div
            className={cn(
              "flex flex-col gap-4 items-center bg-deep p-3 rounded-xl mt-4",
              "sm:flex-row",
            )}
          >
            {/* ====== profile image ====== */}
            <div className={cn("relative w-max")}>
              <div
                className={cn(
                  "border border-blue-600 w-50 h-50 rounded-full",
                  "overflow-hidden",
                )}
              >
                <img
                  src="./favicon.svg"
                  alt=""
                  className={cn("w-full h-full")}
                />
              </div>
              {/* ====== profile edit pen icon ====== */}
              <div
                className={cn(
                  "bg-custom-blue w-max p-4 rounded-full absolute",
                  "top-full left-full -translate-y-full -translate-x-full",
                  "border border-deep",
                )}
              >
                <FaPen />
              </div>
            </div>

            {/* ====== profile details ====== */}
            <div className={cn("flex flex-col gap-2")}>
              {/* ====== profile user name ====== */}
              <h1 className={cn("text-4xl font-bold")}>Roseline Okon</h1>
              {/* ====== verified user status ====== */}
              <div
                className={cn(
                  "flex gap-2 bg-blue-600 w-max px-2 py-1 rounded-full",
                )}
              >
                <FaRegCheckCircle
                  className={cn("bg-custom-green rounded-full text-2xl")}
                />
                <p>Verified User</p>
              </div>
              <h2>Registered May 21, 2026</h2>
            </div>
          </div>

          {/* ====== PERSONAL DEATILS ====== */}
          <div className={cn("mt-4 bg-deep p-3 rounded-xl")}>
            <div className={cn("flex gap-4 items-center mb-5")}>
              <FaUser className={cn("text-4xl")} />
              <div className={cn("")}>
                <h1 className={cn("text-2xl")}>Personal Details</h1>
                <p>Update your personal information</p>
              </div>
            </div>
            <div>
              {/* ====== Fullname ====== */}
              <div
                className={cn(
                  "grid grid-cols-1 py-3 border-b border-gray-600",
                  "sm:grid-cols-3",
                )}
              >
                <h1 className={cn("font-bold")}>Full Name</h1>
                <h1 className={cn("text-[14px] mobile:text-[1rem]")}>
                  Roseline Okon
                </h1>
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                  >
                    <FaPen className={cn("text-orange-400")} />
                  </div>
                </div>
              </div>

              {/* ====== Email address ====== */}
              <div
                className={cn(
                  "grid grid-cols-1 py-3 border-b border-gray-600",
                  "sm:grid-cols-3",
                )}
              >
                <h1 className={cn("font-bold")}>Email Address</h1>
                <h1 className={cn("text-[14px] mobile:text-[1rem]")}>
                  roseline@gmail.com
                </h1>
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                  >
                    <FaPen className={cn("text-orange-400")} />
                  </div>
                </div>
              </div>

              {/* ====== Department ====== */}
              <div
                className={cn(
                  "grid grid-cols-1 py-3 border-b border-gray-600",
                  "sm:grid-cols-3",
                )}
              >
                <h1 className={cn("font-bold")}>Department</h1>
                <h1 className={cn("text-[14px] mobile:text-[1rem]")}>
                  Computer Science
                </h1>
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                  >
                    <FaPen className={cn("text-orange-400")} />
                  </div>
                </div>
              </div>

              {/* ====== Matric Number ====== */}
              <div
                className={cn(
                  "grid grid-cols-1 py-3 border-b border-gray-600",
                  "sm:grid-cols-3",
                )}
              >
                <h1 className={cn("font-bold")}>Matric Number</h1>
                <h1 className={cn("text-[14px] mobile:text-[1rem]")}>
                  FPOG2025/HND/NCC/005
                </h1>
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                  >
                    <FaPen className={cn("text-orange-400")} />
                  </div>
                </div>
              </div>

              {/* ====== Phone Number ====== */}
              <div
                className={cn(
                  "grid grid-cols-1 py-3 border-b border-gray-600",
                  "sm:grid-cols-3",
                )}
              >
                <h1 className={cn("font-bold")}>Phone Number</h1>
                <h1 className={cn("text-[14px] mobile:text-[1rem]")}>
                  +2349045894352
                </h1>
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                  >
                    <FaPen className={cn("text-orange-400")} />
                  </div>
                </div>
              </div>

              {/* ====== Username ====== */}
              <div
                className={cn(
                  "grid grid-cols-1 py-3 border-b border-gray-600",
                  "sm:grid-cols-3",
                )}
              >
                <h1 className={cn("font-bold")}>Username</h1>
                <h1 className={cn("text-[14px] mobile:text-[1rem]")}>
                  roseline
                </h1>
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                  >
                    <FaPen className={cn("text-orange-400 text-[0.818rem]")} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====== BUTTONS ====== */}
          <div className={cn("flex gap-2 mt-10")}>
            <Button classes="text-[14px] mobile:text-[1rem] mobile:w-40 md:w-60">
              Change password
            </Button>
            <Button classes="bg-custom-blue text-[14px] mobile:text-[1rem] mobile:w-40 md:w-60">
              Save
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
