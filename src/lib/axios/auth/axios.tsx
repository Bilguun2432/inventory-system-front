import axios, { AxiosResponse, AxiosError } from "axios";
// import { signOut } from "next-auth/react";

const authURL = process.env.NEXT_PUBLIC_AUTH_URL;

const fetcher = axios.create({
  baseURL: authURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    throw error;
  },
);

export default fetcher;

// fetcher.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     const { response } = error;
//     if (response) {
//       const { status } = response;
//       if (status == 401) {
//         signOut();
//       }
//     }
//     return Promise.reject(error);
//   }
// );
