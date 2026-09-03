import { InAppHeader } from "../../../../Components/InAppHeader";
import { cn } from "../../../../utilities/classNames";
import { FaPen, FaSignOutAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Button } from "../../../../Components/Button";
import { SideBar } from "../../../../Components/SideBar";
import { useProfile } from "./useProfile";
import { SelectImageBox } from "../../../../Components/SelectImageBox";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const {
    userProfile,
    setUserProfile,
    selectImage,
    setSelectImage,
    imgSrc,
    setImgSrc,
    loadAnimation,
    runLoadAnimation,
    sendUpdatedProfile,
    sendOTP,
  } = useProfile();

  const navigate = useNavigate();

  return (
    <div className={cn("flex h-dvh flex-col-reverse sm:flex-row")}>
      {loadAnimation.state && runLoadAnimation()}
      <SideBar active="profile" classes="sm:block" />
      <section
        className={cn(
          "w-full text-custom-white p-3 overflow-auto relative h-dvh",
        )}
      >
        <div
          className={cn(
            "bg-[url('/fpog-logo.png')] bg-no-repeat  bg-center",
            "absolute w-full h-full inset-0 z-[-1] opacity-20",
          )}
        ></div>
        <InAppHeader
          content="User Profile"
          routeBack="/home"
          arrowClasses="mobile:hidden"
          headerClasses="mobile:mr-0"
        />
        {selectImage && (
          <SelectImageBox
            setSelectImage={setSelectImage}
            setProfileImgSrc={setImgSrc}
          />
        )}
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
                <img src={imgSrc} alt="" className={cn("w-full h-full")} />
              </div>
              {/* ====== profile edit pen icon ====== */}
              <div
                className={cn(
                  "bg-custom-blue w-max p-4 rounded-full absolute",
                  "top-full left-full -translate-y-full -translate-x-full",
                  "border border-deep",
                )}
                onClick={() => {
                  setSelectImage(true);
                }}
              >
                <FaPen />
              </div>
            </div>

            {/* ====== profile details ====== */}
            <div className={cn("flex flex-col gap-2")}>
              {/* ====== profile user name ====== */}
              <h1 className={cn("text-4xl font-bold")}>
                {userProfile.fullname.data}
              </h1>
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
              <h2>
                Registered{" "}
                {userProfile?.createdAt
                  ? new Date(userProfile.createdAt).toDateString()
                  : "Unknown"}
              </h2>
            </div>
          </div>

          {/* ====== PERSONAL DEATILS ====== */}
          <div className={cn("mt-4 bg-deep p-3 rounded-xl")}>
            <div className={cn("flex gap-4 items-center mb-5 flex-wrap")}>
              <FaUser className={cn("text-4xl")} />
              <div className={cn("")}>
                <h1 className={cn("text-2xl")}>Personal Details</h1>
                <p>Update your personal information</p>
              </div>
              <Button
                classes="ml-auto rounded-full w-max px-4 py-1"
                onClick={() => {
                  const cache = JSON.parse(
                    localStorage.getItem("crsUserProfile")!,
                  );
                  setUserProfile(cache);
                }}
              >
                Reset
              </Button>
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

                <input
                  type="text"
                  className={cn(
                    "text-[14px] mobile:text-[1rem]",
                    userProfile.fullname.readonly
                      ? "outline-none"
                      : "outline-1 outline-custom-orange",
                  )}
                  value={userProfile.fullname.data}
                  readOnly={userProfile.fullname.readonly}
                  onChange={(e) => {
                    setUserProfile((prev: any) => ({
                      ...prev,
                      fullname: {
                        data: e.target.value,
                        readonly: false,
                      },
                    }));
                  }}
                />
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                    onClick={() => {
                      setUserProfile((prev) => {
                        const update = { ...prev.fullname, readonly: false };
                        return { ...prev, fullname: update };
                      });
                    }}
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
                <input
                  type="text"
                  className={cn(
                    "text-[14px] mobile:text-[1rem]",
                    userProfile.email.readonly
                      ? "outline-none"
                      : "outline-1 outline-custom-orange",
                  )}
                  value={userProfile.email.data}
                  readOnly={userProfile.email.readonly}
                  onChange={(e) => {
                    setUserProfile((prev: any) => ({
                      ...prev,
                      email: {
                        data: e.target.value,
                        readonly: false,
                      },
                    }));
                  }}
                />
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                    onClick={() => {
                      setUserProfile((prev) => {
                        const update = { ...prev.email, readonly: false };
                        return { ...prev, email: update };
                      });
                    }}
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
                <input
                  type="text"
                  className={cn(
                    "text-[14px] mobile:text-[1rem]",
                    userProfile.department.readonly
                      ? "outline-none"
                      : "outline-1 outline-custom-orange",
                  )}
                  value={userProfile.department.data}
                  readOnly={userProfile.department.readonly}
                  onChange={(e) => {
                    setUserProfile((prev: any) => ({
                      ...prev,
                      department: {
                        data: e.target.value,
                        readonly: false,
                      },
                    }));
                  }}
                />
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                    onClick={() => {
                      setUserProfile((prev) => {
                        const update = { ...prev.department, readonly: false };
                        return { ...prev, department: update };
                      });
                    }}
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
                <input
                  type="text"
                  className={cn(
                    "text-[14px] mobile:text-[1rem]",
                    userProfile.Matric_Number.readonly
                      ? "outline-none"
                      : "outline-1 outline-custom-orange",
                  )}
                  value={userProfile.Matric_Number.data}
                  readOnly={userProfile.Matric_Number.readonly}
                  onChange={(e) => {
                    setUserProfile((prev: any) => ({
                      ...prev,
                      Matric_Number: {
                        data: e.target.value,
                        readonly: false,
                      },
                    }));
                  }}
                />
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                    onClick={() => {
                      setUserProfile((prev) => {
                        const update = {
                          ...prev.Matric_Number,
                          readonly: false,
                        };
                        return { ...prev, Matric_Number: update };
                      });
                    }}
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
                <input
                  type="text"
                  className={cn(
                    "text-[14px] mobile:text-[1rem]",
                    userProfile.Phone_Number.readonly
                      ? "outline-none"
                      : "outline-1 outline-custom-orange",
                  )}
                  value={userProfile.Phone_Number.data}
                  readOnly={userProfile.Phone_Number.readonly}
                  onChange={(e) => {
                    setUserProfile((prev: any) => ({
                      ...prev,
                      Phone_Number: {
                        data: e.target.value,
                        readonly: false,
                      },
                    }));
                  }}
                />
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                    onClick={() => {
                      setUserProfile((prev) => {
                        const update = {
                          ...prev.Phone_Number,
                          readonly: false,
                        };
                        return { ...prev, Phone_Number: update };
                      });
                    }}
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
                <input
                  type="text"
                  className={cn(
                    "text-[14px] mobile:text-[1rem]",
                    userProfile.username.readonly
                      ? "outline-none"
                      : "outline-1 outline-custom-orange",
                  )}
                  value={userProfile.username.data}
                  readOnly={userProfile.username.readonly}
                  onChange={(e) => {
                    setUserProfile((prev: any) => ({
                      ...prev,
                      username: {
                        data: e.target.value,
                        readonly: false,
                      },
                    }));
                  }}
                />
                <div>
                  <div
                    className={cn(
                      "bg-custom-blue w-max rounded-full p-2 justify-self-end",
                    )}
                    onClick={() => {
                      setUserProfile((prev) => {
                        const update = { ...prev.username, readonly: false };
                        return { ...prev, username: update };
                      });
                    }}
                  >
                    <FaPen className={cn("text-orange-400 text-[0.818rem]")} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====== BUTTONS ====== */}
          <div className={cn("flex gap-2 mt-10")}>
            <Button
              classes="text-[14px] mobile:text-[1rem] mobile:w-40 md:w-60"
              onClick={() => sendOTP()}
            >
              Change password
            </Button>
            <Button
              onClick={() => sendUpdatedProfile()}
              classes="bg-custom-blue text-[14px] mobile:text-[1rem] mobile:w-40 md:w-60"
            >
              Save
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {
            localStorage.removeItem("userData");
            navigate("/login");
          }}
          classes="sm:hidden! w-full mt-20  bg-accent px-4 flex items-center justify-center gap-2"
        >
          <FaSignOutAlt className={cn("text-xl")} />
          Logout
        </Button>
      </section>
    </div>
  );
};
