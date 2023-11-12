import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GET, POST, DELETE } from "@/lib/axios/admn/http-requests";

const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/product";

export function useProductImageListSwr(productId: number) {
  return useSWR(`${urlBase}/${productId}/image`, GET);
}
export function useProductImageMakeThumbSwr(
  productId: number,
  id: number,
  imageType: string,
) {
  return useSWRMutation(
    `${urlBase}/${productId}/image/${id}/make/${imageType}`,
    GET,
  );
}

export function useProductImageAddSwr(productId: number) {
  return useSWRMutation(`${urlBase}/${productId}/image/add`, POST);
}
export function useProductImageDeleteSwr(productId: number, id: number) {
  return useSWRMutation(`${urlBase}/${productId}/image/${id}/delete`, DELETE);
}
