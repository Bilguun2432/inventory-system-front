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
  console.log("url", url);
  console.log("arg", arg);
  return await axios.post(url, arg).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}

async function deleteRequest(url: string) {
  console.log("url", url);

  // return await axios.delete(url).then((res: AxiosResponse) => {
  //   const { status, data }: AxiosResponse = res;
  //   if (status != 200) {
  //     return [];
  //   }
  //   return data;
  // });
}

export function useListSwr() {
  return useSWR(`${urlBase}/role`, getRequest);
}
export function useListPermissionSwr() {
  return useSWR(`${urlBase}/permission`, getRequest);
}

export function useDetailRoleSwr(id: number) {
  return useSWR(`${urlBase}/role/${id}`, getRequest);
}

export function useCreateAuthRolePermissionSwr(id: number) {
  return useSWRMutation(`${urlBase}/role/${id}/permission/add`, postRequest);
}

export function useDeleteSwr(id: number, id2: number) {
  console.log(
    "delete=>",
    id,
    id2,
    `${urlBase}/role/${id}/permission/${id2}/remove`,
  );
  return useSWRMutation(
    `${urlBase}/role/${id}/permission/${id2}/remove`,
    deleteRequest,
  );
}
