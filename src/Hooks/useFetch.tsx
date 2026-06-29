export const useFetch = () => {
  const baseUrl = "https://crime-reporting-system-server.onrender.com";

  //   ====== HANDLE GET REQUEST ======
  const getRequest = async (route: string) => {
    let response: any;
    let error: any;
    let statusCode: any;

    try {
      const res: Response = await fetch(`${baseUrl}${route}`, {
        credentials: "include",
      });

      if (!res.ok) {
        statusCode = res.status;
        const err = await res.json();
        if (typeof err.message === "string") {
          throw new Error(err.message);
        }
        throw new Error(err.message[0]);
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
  const postRequest = async ({
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

    try {
      const res = await fetch(`${baseUrl}${route}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "POST",
        body: customData,
      });

      if (!res.ok) {
        const err = await res.json();
        if (typeof err.message === "string") {
          throw new Error(err.message);
        }
        throw new Error(err.message[0]);
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
  const multipartRequest = async ({
    form,
    route,
  }: {
    form: HTMLFormElement;
    route: string;
  }) => {
    let response: any;
    let error: any;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${baseUrl}${route}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        if (typeof err.message === "string") {
          throw new Error(err.message);
        }
        throw new Error(err.message[0]);
      }

      response = await res.json();
    } catch (err: any) {
      console.log(err);
      err.message === "Failed to fetch" && (err = "Cannot connect to server!");
      error = err.message;
    }

    return { response, error };
  };

  return { getRequest, postRequest, multipartRequest };
};
