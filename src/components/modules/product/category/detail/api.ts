import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product";

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
  return await axios.put(url, arg).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}

export function useListSwr() {
  return useSWR(`${urlBase}/category/`, getRequest);
}

export function useDetailSwr(id: number | string | string[]) {
  return useSWR(`${urlBase}/category/${id}/detail`, getRequest);
}

export function useProductSwr(id: number | string | string[]) {
  return useSWR(`/${id}/product`, getRequest);
}

export function useProductUnitSwr(id: number | string | string[]) {
  return useSWR(`/${id}/unit`, getRequest);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/category/create`, postRequest);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/category/${id}/update`, putRequest);
}
