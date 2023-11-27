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
import { useProductCreateSwr, useCategoryDetailSwr, useUpdateSwr } from "./api";
import { ProductType } from "@/types/modules/product";
import Loading from "@/components/loader/loader";
import { AxiosError } from "axios";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useDetailEmailSwr } from "./userapi";
import dataURLtoFile from "./file";

interface FormProps {
  id?: number;
  onComplete?: () => void;
}

export default function ProductNewForm(props: FormProps) {
  const { onComplete, id } = props;
  const { data: category, mutate } = useCategoryDetailSwr(id);
  const { trigger: triggerCreate } = useProductCreateSwr();
  const theme = useTheme();

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { data } = useSession();

  const { data: authUser } = useDetailEmailSwr(data?.user?.email);

  const isReadOnly = true;

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
    data["category"] = category.name;

    if (imageSrc) {
      const timestamp = new Date().getTime();
      const filename = `uploaded_image_${timestamp}.jpg`;
      const file = dataURLtoFile(imageSrc, filename);
      data.image = file;
    }

    console.log("hi", data);
    // mutatePromise = triggerCreate(data);

    let formData: any = new FormData();
    formData.append("category", category.name);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("id", authUser?.id);
    formData.append("unit", data.unit);
    formData.append("image", data.image);
    console.log("data=>", data);

    fetch("http://localhost:8000/_admn/product/create", {
      method: "POST",
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
    //       mutate();
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
          <TextField label={"Ангилал"} defaultValue={category?.name ?? ""} fullWidth size="medium" InputProps={{ readOnly: isReadOnly }} />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField label={"Нэр"} {...register("name")} fullWidth size="medium" error={errors.name ? true : false} helperText={errors.name?.message} />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Тайлбар"}
            {...register("description")}
            fullWidth
            size="medium"
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField label={"Тоо"} {...register("unit")} fullWidth size="medium" error={errors.unit ? true : false} helperText={errors.unit?.message} />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField label={"Үнэ"} {...register("price")} fullWidth size="medium" error={errors.price ? true : false} helperText={errors.price?.message} />
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
