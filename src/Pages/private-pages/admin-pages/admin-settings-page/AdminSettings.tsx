import { FaDeskpro, FaDesktop, FaLaptop, FaLock, FaUser } from "react-icons/fa";
import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { Button } from "../../../../Components/Button";
import { cn } from "../../../../utilities/classNames";

export const AdminSettings = () => {
  return (
    <div className={cn("text-white flex")}>
      <AdminSideBar active="settings" />
      <section className={cn("p-3 mx-auto h-dvh overflow-y-auto")}>
        <h1>Settings</h1>

        {/* ====== CHANGE USERNAME ====== */}
        <form
          action=""
          className={cn("bg-dark p-4 rounded-xl mt-10 shadow-xl")}
        >
          <div className={cn("flex items-center gap-4")}>
            <div className={cn("bg-blue-600/20 w-max p-4 rounded-full")}>
              <FaUser className={cn("text-blue-600 text-4xl")} />
            </div>
            <div>
              <h1 className={cn("text-xl font-bold")}>Change Username</h1>
              <h2>Update admin account information.</h2>
            </div>
          </div>
          <div className={cn("flex gap-4 mt-4")}>
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="">Current Username</label>
              <h2 className={cn("p-2 text-xl bg-border rounded-md")}>
                username
              </h2>
            </div>
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="" className={cn("font-bold")}>
                New Username
              </label>
              <input
                className={cn("p-2 border rounded-md w-80")}
                placeholder="Username here..."
                type="text"
                name="new-username"
              />
            </div>
          </div>
          <Button classes="mt-4">Update username</Button>
        </form>

        {/* ====== CHANGE PASSWORD ====== */}
        <form
          action=""
          className={cn("bg-dark p-4 rounded-xl mt-10 shadow-xl")}
        >
          <div className={cn("flex items-center gap-4")}>
            <div className={cn("bg-blue-600/20 w-max p-4 rounded-full")}>
              <FaLock className={cn("text-4xl text-blue-600")} />
            </div>
            <div>
              <h1 className={cn("text-xl font-bold")}>Change Password</h1>
              <h2>
                Ensure admin account is using a long, random password to stay
                secure.
              </h2>
            </div>
          </div>
          <div className={cn("flex gap-4 mt-5 flex-wrap")}>
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="" className={cn("font-bold")}>
                Current Password
              </label>
              <input
                className={cn("p-2 border rounded-md w-80")}
                type="password"
                name="current-password"
                placeholder="Password here..."
              />
            </div>
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="" className={cn("font-bold")}>
                New Password
              </label>
              <input
                className={cn("p-2 border rounded-md w-80")}
                type="password"
                name="new-password"
                placeholder="Password here..."
              />
            </div>
            <div className={cn("flex flex-col gap-2")}>
              <label htmlFor="" className={cn("font-bold")}>
                Confirm Password
              </label>
              <input
                className={cn("p-2 border rounded-md w-80")}
                type="password"
                placeholder="Password here..."
              />
            </div>
          </div>
          <Button classes="mt-4">Update Password</Button>
        </form>

        {/* ====== LOGOUT USERS ====== */}
        <div className={cn("bg-dark p-4 rounded-xl mt-10 shadow-xl")}>
          <div className={cn("flex items-center gap-4")}>
            <div className={cn("bg-blue-600/20 w-max rounded-full p-4")}>
              <FaDesktop className={cn("text-4xl text-blue-600")} />
            </div>
            <div>
              <h1 className={cn("text-xl font-bold")}>
                Log out from this device
              </h1>
              <h1>Admin session will be logged out from this device</h1>
            </div>
          </div>
          <Button classes="bg-accent mt-5">Logout</Button>
        </div>
      </section>
    </div>
  );
};
