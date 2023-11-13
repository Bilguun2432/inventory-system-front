"use client";

import { useRef, useState } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useCreateSwr, useUpdateSwr } from "./api";
import { ProductCategoryType } from "@/types/modules/product";
import Loading from "@/components/loader/loader";
import { AxiosError } from "axios";

interface FormProps {
  productCategory?: ProductCategoryType;
  onComplete?: () => void;
}

export default function ProductCategoryForm(props: FormProps) {
  const { productCategory, onComplete } = props;
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(productCategory?.id ?? 0);

  const validationSchema = yup.object({
    name: yup.string(),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    let mutatePromise;
    if (productCategory && productCategory.id) {
      mutatePromise = triggerUpdate(data);
    } else {
      console.log("data=>", data);
      mutatePromise = triggerCreate(data);
    }

    mutatePromise
      .then(function () {
        if (onComplete) {
          onComplete();
        }
      })
      .catch(function (error: AxiosError) {
        console.log({ error });
      });
  };

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Name"}
            {...register("name")}
            defaultValue={productCategory?.name ?? ""}
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
            defaultValue={productCategory?.description ?? ""}
            fullWidth
            multiline
            rows={3}
            size="medium"
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />
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
