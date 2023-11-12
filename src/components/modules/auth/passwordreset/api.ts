import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "";

async function postRequest(url: string, { arg }: any) {
  console.log("url=>", url);
  console.log("arg=>", arg);

  return await axios.post(url, arg).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status !== 200) {
      throw new Error("Password reset failed");
    }
    return data;
  });
}

export function usePasswordReset() {
  return useSWRMutation(`${urlBase}/password/reset`, postRequest);
}
