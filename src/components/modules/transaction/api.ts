import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT } from "@/lib/axios/admn/http-requests";
import { TransactionType } from "@/types/modules/transaction";
import { TransactionListRequestType } from "./list";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios/admn/axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/transaction";

export const useListSwr = () => {
  return useSWR(`${urlBase}/`, GET);
};

export function useDetailSwr(id: number) {
  return useSWR(`${urlBase}/${id}/detail`, GET);
}

const transactionApi = {
  fulfill(transaction: TransactionType) {
    return axios.get(`${urlBase}/${transaction.id}/fulfill`);
  },
};

export const transactionAPI = {
  listFilter: (reqData: TransactionListRequestType): Promise<AxiosResponse> => {
    return axios.post(`${urlBase}`, reqData);
  },
};
