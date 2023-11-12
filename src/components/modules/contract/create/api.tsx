import { POST } from "@/lib/axios/admn/http-requests";
import useSWRMutation from "swr/mutation";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/contract";

export function useCreateContractSwr() {
  return useSWRMutation(`${urlBase}`, POST);
}
export function useContractRequestSwr() {
  return useSWRMutation(`${urlBase}/request`, POST);
}
