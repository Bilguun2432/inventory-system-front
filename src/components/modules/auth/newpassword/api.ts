import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "";

async function putRequest(url: string, { arg }: any) {
  return await axios.put(url, arg).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status !== 200) {
      throw new Error("New password failed");
    }
    return data;
  });
}
// reset_token: string
export function useNewPassword(reset_token: string) {
  return useSWRMutation(`${urlBase}/password/reset/${reset_token}`, putRequest);
}
