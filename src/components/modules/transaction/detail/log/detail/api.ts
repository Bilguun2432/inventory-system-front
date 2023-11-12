import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
import useSWR from "swr";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/transaction/log";

async function getRequest(url: string) {
  return await axios.get(url).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}
export function useListSwr(id: number) {
  return useSWR(`${urlBase}/${id}/transaction`, getRequest);
}
