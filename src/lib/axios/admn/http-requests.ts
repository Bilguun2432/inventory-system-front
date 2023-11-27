import axios from "./axios";
import { AxiosResponse } from "axios";

export async function GET(url: string) {
  console.log("url->", url);
  return await axios.get(url).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status == 201) {
      return data;
    }
    if (status != 200) {
      return [];
    }
    return data;
  });
}

export async function POST(url: string, { arg }: any) {
  console.log(url, arg);
  return await axios
    .post(url, arg)
    .then((res: AxiosResponse) => {
      const { status, data }: AxiosResponse = res;
      if (status == 201) {
        return data;
      }

      if (status != 200) {
        return [];
      }

      return data;
    })
    .catch((e) => {
      console.log(e);
      return {
        error: typeof e?.response?.data?.detail === "object" ? e?.response?.data?.detail?.[0]?.msg : e?.response?.data?.detail,
        body: typeof e?.response?.data?.detail === "object" ? e?.response?.data?.detail : null,
      };
    });
}

export async function PUT(url: string, { arg }: any) {
  return await axios.put(url, arg).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}
export async function DELETE(url: string) {
  return await axios.delete(url).then((res: AxiosResponse) => {
    const { status, data }: AxiosResponse = res;
    if (status != 200) {
      return [];
    }
    return data;
  });
}
