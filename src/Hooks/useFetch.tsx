import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useFetch = () => {
  const baseUrl = import.meta.env.PROD
    ? "https://crime-reporting-system-server.onrender.com"
    : "http://localhost:3000";

  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const renewToken = async ({
    fnc,
    route,
    data,
    type,
    form,
  }: {
    fnc: "GET" | "POST" | "MULTIPART";
    route: string;
    data?: any;
    type?: any;
    form?: any;
  }) => {
    const userData = JSON.parse(localStorage.getItem("userData")!);

    let error: any;

    try {
      const res = await fetch(`${baseUrl}/auth`, {
        headers: { Authorization: `Bearer ${userData.refreshToken}` },
      });

      const response = await res.json();

      if (!res.ok) {
        console.log("error happen");
        if (res.status === 401 || res.status === 403) {
          showMessage({
            text: "User session expired!",
            status: "warning",
          });
          navigate("/login");
          return;
        } else {
          throw new Error(response.message);
        }
      }
      console.log("Token renewed!");
      userData["accessToken"] = response.accessToken;
      localStorage.setItem("userData", JSON.stringify(userData));

      switch (fnc) {
        case "GET":
          return getRequest(route);
        case "POST":
          // console.log(res.status, response);
          // break;
          return postRequest({ data, route, type });
        case "MULTIPART":
          return multipartRequest({ form, route, type });
      }
    } catch (err: any) {
      error = err.message;
      return { error };
    }
  };
  //
  //
  //
  //
  //
  //   ====== HANDLE GET REQUEST ======
  const getRequest: any = async (route: string) => {
    let response: any;
    let error: any;
    let statusCode: any;

    const { accessToken } = JSON.parse(localStorage.getItem("userData")!);

    try {
      const res: Response = await fetch(`${baseUrl}${route}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        if (
          (res.status === 401 || res.status === 403) &&
          err.message.toLowerCase().includes("token")
        ) {
          return renewToken({ fnc: "GET", route });
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
          throw new Error(err.message[0]);
        }
      }

      response = await res.json();
    } catch (err: any) {
      err.message === "Failed to fetch" &&
        (err.message = "Cannot connect to server!");
      error = err.message;
    }

    return { response, error, statusCode };
  };
  //
  //
  //
  //
  //
  //   ====== HANDLE POST REQUEST ======
  const postRequest: any = async ({
    data,
    route,
    type,
  }: {
    data: any;
    route: string;
    type: "formElement" | "object";
  }) => {
    let response: any;
    let error: any;
    let customData: any;

    if (type == "object") {
      customData = JSON.stringify(data);
    } else {
      const formData = new FormData(data);
      customData = {};
      for (let [key, value] of formData.entries()) {
        customData[key] = value;
      }
      customData = JSON.stringify(customData);
    }

    let accessToken = "";
    if (route !== "/user/signin" && route !== "/admin/signin") {
      const userData = JSON.parse(localStorage.getItem("userData")!);
      accessToken = userData.accessToken;
    }

    try {
      const res = await fetch(`${baseUrl}${route}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        credentials: "include",
        method: "POST",
        body: customData,
      });

      if (!res.ok) {
        const err = await res.json();
        if (
          ((res.status === 401 && route !== "/user/signin") ||
            (res.status === 403 && route !== "/user/signin")) &&
          err.message.toLowerCase().includes("token")
        ) {
          return renewToken({ fnc: "POST", route, data, type });
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
          throw new Error(err.message[0]);
        }
      }

      response = await res.json();
    } catch (err: any) {
      err.message === "Failed to fetch" &&
        (err.message = "Cannot connect to server!");
      error = err.message;
    }

    return { response, error };
  };
  //
  //
  //
  //
  //
  //   ====== HANDLE MULTIPART/FORM-DATA REQUEST ======
  const multipartRequest: any = async ({
    form,
    route,
    type,
  }: {
    form: HTMLFormElement;
    route: string;
    type: "formElement" | "formData";
  }) => {
    let response: any;
    let error: any;
    let formData: any;

    type === "formElement" && (formData = new FormData(form));

    const { accessToken } = JSON.parse(localStorage.getItem("userData")!);

    try {
      const res = await fetch(`${baseUrl}${route}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "POST",
        credentials: "include",
        body: type === "formData" ? form : formData,
      });

      if (!res.ok) {
        const err = await res.json();
        if (
          (res.status === 401 || res.status === 403) &&
          err.message.toLowerCase().includes("token")
        ) {
          console.log("I ran");
          return renewToken({ fnc: "MULTIPART", route, form, type });
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
          throw new Error(err.message[0]);
        }
      }

      response = await res.json();
    } catch (err: any) {
      console.log(err);
      err.message === "Failed to fetch" &&
        (err.message = "Cannot connect to server!");
      error = err.message;
    }

    return { response, error };
  };

  return { getRequest, postRequest, multipartRequest };
};
