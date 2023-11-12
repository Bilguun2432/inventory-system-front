import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/auth";

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

async function deleteRequest(url: string) {
  return await axios.delete(url).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}

export function useDetailSwr(id: number) {
  return useSWR(`${urlBase}/role/${id}`, getRequest);
}
export function useListSwr() {
  return useSWR(`${urlBase}/user`, getRequest);
}
export function useListRoleSwr() {
  return useSWR(`${urlBase}/role`, getRequest);
}

export function useDetailAuthUserSwr(id: number) {
  return useSWR(`${urlBase}/user/${id}`, getRequest);
}

export function useCreateAuthUserRoleSwr(id: number) {
  return useSWRMutation(`${urlBase}/user/${id}/role/add`, postRequest);
}

export function useDeleteSwr(id: number, id2: number) {
  return useSWRMutation(
    `${urlBase}/role/${id}/permission/${id2}/remove`,
    deleteRequest,
  );
}
