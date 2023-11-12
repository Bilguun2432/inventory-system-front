import axios from "@/lib/axios/file/axios";

const entryPoint = process.env.NEXT_PUBLIC_FILE_URL ?? "";
const urlBase = entryPoint;

export const FileServiceIdAPI = {
  uploadImage: (file: File, service: string, id: number) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(
      `${urlBase}/image/service/${service}/${id}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
};
