import useSWR from "swr";
import { GET } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/action/status";

export function useActionStatusSwr() {
  return useSWR(`${urlBase}/`, GET);
}
