import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useFetch = () => {
  // const baseUrl = "https://crime-reporting-system-server.onrender.com";
  const baseUrl = "http://localhost:3000";

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
        if (res.status === 401 || res.status === 403) {
          return renewToken({ fnc: "GET", route });
        } else {
          const err = await res.json();
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
    if (route !== "/user/signin") {
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
        if (
          (res.status === 401 && route !== "/user/signin") ||
          (res.status === 403 && route !== "/user/signin")
        ) {
          return renewToken({ fnc: "POST", route, data, type });
        } else {
          const err = await res.json();
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
        if (res.status === 401 || res.status === 403) {
          console.log("I ran");
          return renewToken({ fnc: "MULTIPART", route, form, type });
        } else {
          const err = await res.json();
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
