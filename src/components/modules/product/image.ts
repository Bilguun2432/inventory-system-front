import useSWR from "swr";
import { GET } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/uploads";

export function useImageSwr(imagePath: string) {
  return useSWR(`${urlBase}/${imagePath}`, GET);
}
