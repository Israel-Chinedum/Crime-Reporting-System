import { AdminSideBar } from "../../../../Components/AdminSideBar";
import { Button } from "../../../../Components/Button";
import { cn } from "../../../../utilities/classNames";
import { useAdminSecurityTips } from "./useAdminSecurityTips";

export const AdminSecurityTips = () => {
  const {
    tips,
    saveTip,
    title,
    setTitle,
    message,
    setMessage,
    runLoadAnimation,
    loadAnimation,
    tipToEdit,
    setTipToEdit,
    updateTip,
  } = useAdminSecurityTips();

  return (
    <div className={cn("flex h-dvh")}>
      {loadAnimation.state && runLoadAnimation()}
      <AdminSideBar active="map" />
      <section
        className={cn(
          "sm:w-full mx-auto p-3 h-full overflow-auto text-custom-white relative",
        )}
      >
        <div
          className={cn(
            "bg-[url('/fpog-logo.png')] bg-no-repeat  bg-center",
            "absolute w-full h-full inset-0 z-[-1] opacity-20",
          )}
        ></div>
        <h2 className={cn("")}>Security Tips</h2>
        <div className={cn("flex justify-center pt-20 gap-5")}>
          {/* ====== CREATE AND EDIT TIPS ====== */}
          <form
            action=""
            className={cn(
              "flex flex-col gap-7 p-4 shadow-xl border border-border w-max rounded-xl",
              "h-max py-10 bg-dark",
            )}
            onSubmit={(e) => {
              e.preventDefault();
              !tipToEdit.edit && saveTip();
            }}
          >
            {/* ====== Title ====== */}
            <div className={cn("flex flex-col")}>
              <label
                htmlFor="title"
                className={cn("text-xl text-gray-400 mb-2")}
              >
                Title
              </label>
              <input
                type="text"
                className={cn(
                  "p-3 bg-border w-100 rounded-md border outline-none",
                )}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Tip title..."
              />
            </div>
            {/* ====== Tip ====== */}
            <div className={cn("flex flex-col")}>
              <label
                htmlFor="message"
                className={cn("text-xl text-gray-400 mb-2")}
              >
                Message
              </label>
              <textarea
                className={cn(
                  "resize-none p-3 bg-deep w-100 rounded-md border outline-none h-50",
                  "bg-border",
                )}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Your Message..."
              ></textarea>
            </div>

            {/* ====== Date and Time ====== */}
            <div>
              <h2></h2>
              <h2></h2>
            </div>

            {/* ====== Buttons ====== */}
            <div className={cn("")}>
              {!tipToEdit.edit ? (
                <Button classes="w-full">Create new tip</Button>
              ) : (
                <div className={cn("flex gap-4 justify-between")}>
                  <Button
                    classes="w-[50%] bg-custom-orange"
                    onClick={() => {
                      updateTip();
                    }}
                  >
                    Save changes
                  </Button>
                  <Button
                    classes="w-[50%] bg-accent"
                    onClick={() => {
                      setTitle("");
                      setMessage("");
                      setTipToEdit({ edit: false });
                    }}
                  >
                    Discard changes
                  </Button>
                </div>
              )}
            </div>
          </form>

          {/* ====== SAVED TIPS ====== */}
          <div
            className={cn(
              "shadow-xl border border-border rounded-xl w-100 p-4 cursor-default",
              "overflow-auto h-[70vh] bg-dark",
            )}
          >
            <h2 className={cn("text-xl mb-5")}>All Tips</h2>
            <ol className={cn("flex flex-col gap-4")}>
              {tips.length === 0 ? (
                <h2 className={cn("text-custom-orange")}>
                  No tips available at the moment!
                </h2>
              ) : (
                tips.map((tip: any) => (
                  <li
                    className={cn(
                      "flex items-center justify-between p-4 border border-border rounded-md",
                    )}
                    key={tip.title}
                  >
                    <h2 className={cn("text-xl text-gray-400")}>{tip.title}</h2>
                    <Button
                      classes="w-20 bg-custom-orange"
                      onClick={() => {
                        setTitle(tip.title);
                        setMessage(tip.message);
                        setTipToEdit({ edit: true, tipTitle: tip.title });
                      }}
                    >
                      Edit
                    </Button>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};
