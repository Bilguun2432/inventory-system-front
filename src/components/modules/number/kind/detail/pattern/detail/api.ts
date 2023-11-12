import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT, DELETE } from "@/lib/axios/admn/http-requests";
import { url } from "inspector";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/number/kind/pattern";

export function useListSwr(id: number) {
  return useSWR(`${urlBase}/${id}/pattern`, GET);
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

export function useDeleteSwr(id: number) {
  return useSWRMutation(`${urlBase}/${id}/delete`, DELETE);
}
