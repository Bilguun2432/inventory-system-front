import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";
import { AuthUserListRequestType } from "./list";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios/admn/axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/auth";

export const useListSwr = () => {
  return useSWR(`${urlBase}/user/`, GET);
};

export function useDetailSwr(id?: number) {
  return useSWR(`${urlBase}/user/${id}/detail`, GET);
}

export function useListRoleSwr() {
  return useSWR(`${urlBase}/role`, GET);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/user/create`, POST);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/user/${id}/update`, PUT);
}

export function useUserSwr() {
  return useSWR(`${urlBase}/user/employee`, GET);
}

export const authUserAPI = {
  listFilter: (reqData: AuthUserListRequestType): Promise<AxiosResponse> => {
    return axios.post(`${urlBase}/user`, reqData);
  },
};
