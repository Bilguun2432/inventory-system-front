import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";
import { AuthPermissionListRequestType } from "./list";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios/admn/axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/auth/permission";

export function useListSwr() {
  return useSWR(urlBase, GET);
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

export const useAuthPermissionList = () => {
  return useSWR(urlBase, GET);
};

export const authPermissionAPI = {
  listFilter: (reqData: AuthPermissionListRequestType): Promise<AxiosResponse> => {
    return axios.post(`${urlBase}`, reqData);
  },
};
