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

interface FormProps {
  id?: number;
  product?: ProductType;
  selectedCategory?: string;
  onComplete?: () => void;
}

export default function ProductForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const theme = useTheme();
  const { id, product, selectedCategory, onComplete } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);

  console.log("hh", selectedCategory);

  const entityEdit = useRef<ProductType | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: ProductType = { ...data };
    entityEdit.current = clientLoad;
    console.log("entityEdit", entityEdit);
    setEntityLoading(false);
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    price: yup.number(),
    unit: yup.number(),

    enabled: yup.boolean().default(false),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    data.category = selectedCategory;
    let mutatePromise;
    if (entityEdit.current && entityEdit.current.id) {
      console.log("hi", data);
      mutatePromise = triggerUpdate(data);
    } else {
      console.log("data=>", data);
      mutatePromise = triggerCreate(data);
    }

    console.log("mutatePromise", mutatePromise);

    mutatePromise
      // .then(function (response: AxiosResponse) {
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
            label={"Category"}
            value={selectedCategory}
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
            defaultValue={data ? data.name : ""}
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
            defaultValue={data ? data.description : ""}
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
            defaultValue={data ? data.price : ""}
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
            defaultValue={data ? data.unit : ""}
            fullWidth
            size="medium"
            error={errors.unit ? true : false}
            helperText={errors.unit?.message}
          />
        </Box>

        <Box>
          <FormControlLabel control={<Checkbox defaultChecked={data ? data.enabled : false} {...register("enabled")} />} label="Enabled" />
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
