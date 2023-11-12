import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST } from "@/lib/axios/admn/http-requests";
import { TransactionInvoiceType } from "@/types/modules/transaction";
import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/transaction";

export const useInvoiceListSwr = () => {
  return useSWR(`${urlBase}/`, GET);
};

export const useSearchSwr = () => {
  return useSWRMutation(`${urlBase}/`, POST);
};

export function useListByTransactionSwr(transactionId: number) {
  return useSWR(`${urlBase}/${transactionId}/invoice`, GET);
}

const transactionInvoiceApi = {
  check(invoice: TransactionInvoiceType) {
    return axios.get(
      `${urlBase}/${invoice.transactionId}/invoice/${invoice.id}/check`,
    );
  },
};

export default transactionInvoiceApi;
