import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product";

export const useListSwr = () => {
  return useSWR(`${urlBase}/`, GET);
};

export function useDetailSwr(id: number) {
  return useSWR(`${urlBase}/${id}`, GET);
}

export function useCreateSwr() {
  return useSWRMutation(`${urlBase}/create`, POST);
}

export function useUpdateSwr(id: number) {
  return useSWRMutation(`${urlBase}/${id}/update`, PUT);
}
