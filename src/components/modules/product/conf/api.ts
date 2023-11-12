import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";
import { ProductConfListRequestType } from "./list";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios/admn/axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product/conf";

export function useListSwr() {
  return useSWR(`${urlBase}/`, GET);
}

export function useDetailSwr(id: number) {
  return useSWR(`${urlBase}/${id}/detail`, GET);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/create`, POST);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/${id}/update`, PUT);
}

export const productConfAPI = {
  listFilter: (reqData: ProductConfListRequestType): Promise<AxiosResponse> => {
    return axios.post(`${urlBase}`, reqData);
  },
};
