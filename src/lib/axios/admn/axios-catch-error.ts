// import { signOut } from "next-auth/react";
import { AxiosError } from "axios";
// import { toast } from "react-toastify";

const AxiosCatchError = (error: AxiosError) => {
  let message;
  const { response } = error;

  if (response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log("Data", response.data);
    // console.log("Status", response.status);
    // console.log("Headers", response.headers);
    // message = response.data.detail
    //   ? response.data.detail
    //   : response.data.message
    //   ? response.data.message
    //   : response.data.Message;
    // if (
    //   typeof window !== "undefined" &&
    //   response.status === 401 &&
    //   response.config &&
    //   !response.__isRetryRequest
    // ) {
    //   signOut({ callbackUrl: "/auth/login" });
    // }
  } else if (error.request) {
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log("Request", error.request);
    // message = error.request;
  } else {
    // Something happened in setting up the request and triggered an Error
    // console.log("Error", error.message);
    // message = error.message;
  }

  console.log("Axios config", error.config);
  console.log("Message", message);

  // if (typeof window !== "undefined") {
  // toast(message);
  // }

  throw new Error(message);
};

export default AxiosCatchError;
