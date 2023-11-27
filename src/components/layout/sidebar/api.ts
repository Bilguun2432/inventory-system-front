import useSWR from "swr";
import { GET } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/auth/user";

export function useDetailEmailSwr(email: string | null | undefined) {
  const encodedEmail = encodeURIComponent(email || "").replace("%40", "@");
  const apiUrl = `${urlBase}/${encodedEmail}/email`;
  return useSWR(apiUrl, GET);
}
