import axios from "@/lib/axios/admn/axios";
import { AxiosResponse, AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product/";

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
  return await axios.post(url, arg).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}

async function putRequest(url: string, { arg }: any) {
  console.log("upd url", url, arg);
  return await axios
    .put(url, arg)
    .then((res: AxiosResponse) => {
      const { status, data }: AxiosResponse = res;
      if (status != 200) {
        return [];
      }
      return data;
    })
    .catch((e) => {
      console.log("err=> ", e);
    });
}

export function useListSwr(productId: number) {
  return useSWR(`${urlBase}${productId}/attribute`, getRequest);
}

export function useDetailSwr(productId: number, id: number) {
  return useSWR(`${urlBase}${productId}/attribute/${id}/detail`, getRequest);
}

export function useCreateSwr(productId: number) {
  return useSWRMutation(`${urlBase}${productId}/attribute/create`, postRequest);
}

export function useUpdateSwr(productId: number, id: number) {
  return useSWRMutation(
    `${urlBase}${productId}/attribute/${id}/update`,
    putRequest,
  );
}
