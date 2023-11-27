import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ProductListRequestType } from "./list";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios/admn/axios";

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
  return useSWR(`${urlBase}/${id}/detail`, getRequest);
}

export const productAPI = {
  listFilter: (id: number, reqData: ProductListRequestType): Promise<AxiosResponse> => {
    return axios.post(`/${id}/product`, reqData);
  },
};

export function useProductUnitSwr(id: number | string | string[]) {
  return useSWR(`/${id}/unit`, getRequest);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/category/create`, postRequest);
}

export function useProductCreateSwr() {
  return useSWRMutation(`${urlBase}/create`, postRequest);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/${id}/update`, putRequest);
}

export function useCategoryDetailSwr(id?: number | string | string[]) {
  return useSWR(`${urlBase}/category/${id}/detail`, getRequest);
}
