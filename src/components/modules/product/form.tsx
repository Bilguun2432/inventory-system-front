"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { useCreateSwr, useUpdateSwr, useDetailSwr } from "./api";
import { ProductType } from "@/types/modules/product";
// import { AxiosError, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { useRef, useEffect, useState } from "react";
import dataURLtoFile from "./file";
import { useSession } from "next-auth/react";
import { useDetailEmailSwr } from "./userapi";

interface FormProps {
  product?: any;
  selectedCategory?: string;
  onComplete?: () => void;
}

export default function ProductForm(props: FormProps) {
  const theme = useTheme();
  const { product, selectedCategory, onComplete } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(product?.id && product?.id > 0 ? product?.id : 0);

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
    // let formData = new FormData();
    // formData.append("category", "Хувцас");

    // fetch("http://localhost:8000/_admn/product/create", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Server response:", data);
    //     // Handle the response data as needed
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     // Handle errors
    //   });

    if (selectedCategory !== null && selectedCategory !== undefined) {
      data.category = selectedCategory;
    }

    if (imageSrc) {
      const timestamp = new Date().getTime();
      const filename = `uploaded_image_${timestamp}.jpg`;
      const file = dataURLtoFile(imageSrc, filename);
      data.image = file;
    }

    let mutatePromise;

    if (product && product.id) {
      console.log("hi", data);
      // mutatePromise = triggerUpdate(formData);
      let formData: any = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("authUserId", authUser?.id);
      formData.append("unit", data.unit);
      formData.append("image", data.image);

      fetch(`http://localhost:8000/_admn/product/${product.id}/update`, {
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
      console.log(mutatePromise);
    } else {
      let formData: any = new FormData();
      formData.append("category", data.category);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("id", authUser?.id);
      formData.append("unit", data.unit);
      formData.append("image", data.image);
      console.log("data=>", data);
      // mutatePromise = triggerCreate(formData);
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
      console.log(mutatePromise);
    }

    console.log("mutatePromise", mutatePromise);

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
            label={"Category"}
            value={selectedCategory}
            defaultValue={product ? product.category.name : ""}
            fullWidth
            size="medium"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Name"}
            {...register("name")}
            defaultValue={product ? product.name : ""}
            fullWidth
            size="medium"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Description"}
            {...register("description")}
            defaultValue={product ? product.description : ""}
            fullWidth
            size="medium"
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            multiline
            rows={3}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Price"}
            {...register("price")}
            defaultValue={product ? product.price : ""}
            fullWidth
            size="medium"
            error={errors.price ? true : false}
            helperText={errors.price?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"unit"}
            {...register("unit")}
            defaultValue={product ? product.unit : ""}
            fullWidth
            size="medium"
            error={errors.unit ? true : false}
            helperText={errors.unit?.message}
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
