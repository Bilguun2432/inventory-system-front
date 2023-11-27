import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, PUT, DELETE } from "@/lib/axios/admn/http-requests";
import { ProductListRequestType } from "./list";
import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/employee";

export const authUserProductAPI = {
  listFilter: (id: number, reqData: ProductListRequestType): Promise<AxiosResponse> => {
    return axios.post(`${urlBase}/${id}/product`, reqData);
  },
};
