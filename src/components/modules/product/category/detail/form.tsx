"use client";

import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCreateSwr, useDetailSwr, useUpdateSwr } from "./api";
import { ProductType } from "@/types/modules/product";
import Loading from "@/components/loader/loader";
import { AxiosError } from "axios";
import dataURLtoFile from "./file";
import { useSession } from "next-auth/react";
import { useDetailEmailSwr } from "./userapi";
import Typography from "@mui/material/Typography";

interface FormProps {
  product?: ProductType;
  onComplete?: () => void;
}

export default function ProductForm(props: FormProps) {
  const { product, onComplete } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(product?.id && product.id > 0 ? product.id : 0);
  const theme = useTheme();

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { data } = useSession();

  const { data: authUser } = useDetailEmailSwr(data?.user?.email);

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    price: yup.number(),
    unit: yup.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    if (imageSrc) {
      const timestamp = new Date().getTime();
      const filename = `uploaded_image_${timestamp}.jpg`;
      const file = dataURLtoFile(imageSrc, filename);
      data.image = file;
    }

    // mutatePromise = triggerUpdate(data);
    console.log("hi", data);
    // mutatePromise = triggerUpdate(formData);
    let formData: any = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("authUserId", authUser?.id);
    formData.append("unit", data.unit);
    formData.append("image", data.image);

    fetch(`http://localhost:8000/_admn/product/${product?.id}/update`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        if (onComplete) onComplete();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // mutatePromise
    //   .then(function () {
    //     if (onComplete) {
    //       onComplete();
    //     }
    //   })
    //   .catch(function (error: AxiosError) {
    //     console.log({ error });
    //   });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Name"}
            {...register("name")}
            defaultValue={product?.name ?? ""}
            fullWidth
            size="medium"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Тайлбар"}
            {...register("description")}
            defaultValue={product?.description ?? ""}
            fullWidth
            size="medium"
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Тоо"}
            {...register("unit")}
            defaultValue={product?.unit ?? ""}
            fullWidth
            size="medium"
            error={errors.unit ? true : false}
            helperText={errors.unit?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Үнэ"}
            {...register("price")}
            defaultValue={product?.price ?? ""}
            fullWidth
            size="medium"
            error={errors.price ? true : false}
            helperText={errors.price?.message}
          />
        </Box>

        {imageSrc && (
          <Box sx={{ mb: theme.spacing(4) }}>
            <Typography variant="h6">Uploaded Picture:</Typography>
            <img src={imageSrc} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }} />
          </Box>
        )}

        <Box sx={{ mb: theme.spacing(4) }}>
          <Button variant="contained" component="label" color="primary">
            Upload Picture
            <input id="fileInput" type="file" accept=".pdf, .png, .jpg, .jpeg" onChange={handleFileChange} style={{ display: "none" }} />
          </Button>
        </Box>

        <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(4) }}>
          <Button type={"submit"} variant="outlined" color="primary" size="medium">
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
