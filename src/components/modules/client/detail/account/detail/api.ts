import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/client/account";

export function useListSwr() {
  return useSWR(`${urlBase}/`, GET);
}

export function useDetailClientAccountSwr(id: number) {
  return useSWR(`${urlBase}/${id}`, GET);
}

export function useDetailSwr(id: number) {
  return useSWR(`${urlBase}/${id}/account`, GET);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/create`, POST);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/${id}/update`, PUT);
}
