import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT, DELETE } from "@/lib/axios/admn/http-requests";
import { ProductListRequestType } from "./list";
import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product";

export function useListSwr() {
  return useSWR(`${urlBase}/`, GET);
}
export function useImageListSwr(productId: number, imageType: string) {
  return useSWR(`${urlBase}/${productId}/image/${imageType}/get`, GET);
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

export function useUpdateTranslateSwr(id: number, locale: string) {
  return useSWRMutation(`${urlBase}/${id}/translate/${locale}/edit`, POST);
}

export function useDetailTranslateSwr(id: number, locale: string) {
  return useSWR(`${urlBase}/${id}/translate/${locale}/get`, GET);
}

export function useSearchSwr(name?: string, description?: string, pricemin?: number, pricemax?: number) {
  return useSWR(
    `${urlBase}/filter?${name ? "name=" + name : ""}${description ? "&description=" + description : ""}${pricemin ? "&pricemin=" + pricemin : ""}${
      pricemax ? "&pricemax=" + pricemax : ""
    }`,
    GET,
  );
}

export const productAPI = {
  listFilter: (reqData: ProductListRequestType): Promise<AxiosResponse> => {
    return axios.post(`${urlBase}`, reqData);
  },
};

export function useDeleteSwr(id: number) {
  return useSWRMutation(`${urlBase}/${id}/delete`, DELETE);
}
