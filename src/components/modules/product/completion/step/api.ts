import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product/completion";

export const useListSwr = (productCompletionId: number) => {
  return useSWR(`${urlBase}/${productCompletionId}/step`, GET);
};

export function useDetailSwr(productCompletionId: number, id: number) {
  return useSWR(`${urlBase}/${productCompletionId}/step/${id}/detail`, GET);
}

export function useCreateSwr(productCompletionId: number) {
  return useSWRMutation(`${urlBase}/${productCompletionId}/step/create`, POST);
}

export function useUpdateSwr(productCompletionId: number, id: number) {
  return useSWRMutation(
    `${urlBase}/${productCompletionId}/step/${id}/update`,
    PUT,
  );
}
