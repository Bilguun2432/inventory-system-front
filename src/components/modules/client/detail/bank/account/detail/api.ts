import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/bank/account";

import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";

async function getRequest(url: string) {
  return await axios.get(url).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    console.log("return data =>", data);
    return data;
  });
}

export function useListSwr() {
  return useSWR(urlBase, GET);
}

export function useDetailSwr(id: number) {
  return useSWR(`${urlBase}/${id}`, getRequest, { revalidateOnMount: true });
  // return getRequest(`${urlBase}/${id}`);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/create`, POST);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/${id}/update`, PUT);
}

export function useDetailBankAccountSwr(id: number) {
  return useSWR(`${urlBase}/${id}/detail`, GET);
}
