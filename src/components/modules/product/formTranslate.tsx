"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useUpdateTranslateSwr } from "./api";
import { ProductTranslateType } from "@/types/modules/product";
// import { AxiosError, AxiosResponse } from "axios";
import { AxiosError } from "axios";

interface FormProps {
  id: number;
  locale: string;
  productTranslate?: ProductTranslateType;
  onComplete?: () => void;
}

export default function ProductFormTranslate(props: FormProps) {
  const theme = useTheme();
  const { id, locale, productTranslate, onComplete } = props;
  const { trigger: triggerUpdateTranslate } = useUpdateTranslateSwr(id, locale);

  console.log("dataaaaaaaaaaaaaa=>", productTranslate);

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: productTranslate?.name ?? "",
    },
  });

  const onSubmit = (data: any) => {
    const mutatePromise = triggerUpdateTranslate(data);

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
          <TextField label={"Name"} {...register("name")} fullWidth size="medium" error={errors.name ? true : false} helperText={errors.name?.message} />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Description"}
            {...register("description")}
            defaultValue={productTranslate ? productTranslate.description : ""}
            fullWidth
            size="medium"
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            multiline
            rows={3}
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
