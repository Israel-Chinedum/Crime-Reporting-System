import { useEffect, useState } from "react";
import { useSocket } from "../../../../Hooks/useSocket";
import { useMessage } from "../../../../Hooks/useMessage";

export const useAdminReports = ({
  autoFetch = true,
}: {
  autoFetch?: boolean;
}) => {
  const socket = useSocket();
  const { showMessage, closeMessage, getUserChoice } = useMessage();

  const [reports, setReports] = useState<any>("Fetching reports...");

  //   ====== GET REPORTS ======
  const getReports = (showFetchMessage: boolean = true) => {
    if (showFetchMessage) {
      showMessage({
        text: reports,
        status: "pending",
        timeout: null,
        noBorder: true,
      });
    }
    socket.emit("reports", (response: any) => {
      if (response.error) {
        showMessage({ text: response.error, status: "error", timeout: 7000 });
        return;
      }

      setReports(
        response.sort((a: any, b: any) => {
          const numb = Number(b.reportId.split("-").at(-1));
          const numa = Number(a.reportId.split("-").at(-1));
          return numb - numa;
        }),
      );
      closeMessage();
    });
  };

  //   ====== TOGGLE ACTION VISIBILITY ======

  window.onclick = (e) => {
    const actDiv = document.getElementsByClassName("all-reports-action-div");
    const element = e.target as HTMLElement;

    for (let i of actDiv) {
      if (!element.classList.contains("more_action")) {
        i.children[1].classList.add("hidden");
      }
    }
  };

  const toggleActVisibility = (event: React.MouseEvent) => {
    const actDiv = document.getElementsByClassName("all-reports-action-div");
    const targetEl = event.currentTarget?.parentElement;
    const isHidden = targetEl?.children[1].classList.contains("hidden");

    for (let i of actDiv) {
      i.children[1].classList.add("hidden");
    }

    if (isHidden) {
      targetEl?.children[1].classList.remove("hidden");
    } else {
      targetEl?.children[1].classList.add("hidden");
    }
  };

  const updateReport = async ({
    message,
    action,
    reportId,
  }: {
    message: string;
    reportId: string;
    action: "resolved" | "active" | "delete";
  }) => {
    if (!reportId) {
      return showMessage({ text: "Cannot find reportId!", status: "warning" });
    }

    showMessage({ text: message, status: "normal", question: true });

    const userChoice = await getUserChoice();

    if (!userChoice) return;

    showMessage({
      text: action !== "delete" ? "Updating report..." : "Deleting report...",
      status: "pending",
      timeout: null,
    });

    socket.emit("update-report", { reportId, action }, (response: any) => {
      if (response.error) {
        showMessage({ text: response.error, status: "error", timeout: 7000 });
        return;
      }
      showMessage({ text: response, status: "success", timeout: 3000 });
      setTimeout(() => {
        showMessage({
          text: "Fetching updated report...",
          status: "pending",
          timeout: null,
        });
        getReports(false);
      }, 3000);
    });
  };

  const getSrc = (reportId: string): Promise<string> => {
    return new Promise((resolve) => {
      socket.emit("get-evidence", reportId, (response: any) => {
        if (response.error) {
          // showMessage({ text: response.error, status: "error", timeout: 7000 });
          return;
        }
        resolve(response);
      });
    });
  };

  useEffect(() => {
    if (!autoFetch) return;
    getReports();
    return () => {
      closeMessage();
    };
  }, []);

  return { reports, toggleActVisibility, updateReport, getSrc };
};
