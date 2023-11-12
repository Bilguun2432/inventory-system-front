import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { GET } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product/category";

async function getRequest(url: string) {
  return await axios.get(url).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}

async function postRequest(url: string, { arg }: any) {
  console.log(url, arg);
  return await axios.post(url, arg).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}

// async function putRequest(url: string, { arg }: any) {
//   return await axios.put(url, arg).then((res: AxiosResponse) => {
//     const { status, data }: AxiosResponse = res;
//     if (status != 200) {
//       return [];
//     }
//     return data;
//   });
// }

export function useListSwr() {
  return useSWR(`${urlBase}/`, getRequest);
}

export function useDetailSwr(id: number | string | string[]) {
  return useSWR(`${urlBase}/${id}/detail`, getRequest);
}

export function useCreateSwr(id: number, locale: string) {
  return useSWRMutation(
    `${urlBase}/${id}/translate/${locale}/edit`,
    postRequest,
  );
}

export function useDetailTranslateSwr(id: number, locale: string) {
  return useSWR(`${urlBase}/${id}/translate/${locale}/get`, GET);
}

export function useUpdateSwr(id: number, locale: string) {
  return useSWRMutation(
    `${urlBase}/${id}/translate/${locale}/edit`,
    postRequest,
  );
}
