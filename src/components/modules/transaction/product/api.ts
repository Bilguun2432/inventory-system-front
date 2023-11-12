import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/transaction";

export const useClientListSwr = () => {
  return useSWR(`${urlBase}/`, GET);
};

export const useSearchSwr = () => {
  return useSWRMutation(`${urlBase}/`, POST);
};

export function useListByTransactionSwr(transactionId: number) {
  return useSWR(`${urlBase}/${transactionId}/product`, GET);
}
