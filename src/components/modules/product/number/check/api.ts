import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";
import { ProductNumberCheckListRequestType } from "./list";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios/admn/axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product";

export function useListSwr() {
  return useSWR(`${urlBase}/number/check`, GET);
}

export function useDetailSwr(id?: number) {
  return useSWR(`${urlBase}/number/check/${id}/detail`, GET);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/number/check/create`, POST);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/number/check/${id}/update`, PUT);
}

export function useByProductListSwr(productId: number) {
  return useSWR(`${urlBase}/${productId}/number/check/list`, GET);
}

export function useToggleToProductSwr(productId: number) {
  return useSWRMutation(`${urlBase}/${productId}/number/check/toggle`, POST);
}

export const productNumberCheckAPI = {
  listFilter: (reqData: ProductNumberCheckListRequestType): Promise<AxiosResponse> => {
    return axios.post(`${urlBase}/number/check`, reqData);
  },
};
