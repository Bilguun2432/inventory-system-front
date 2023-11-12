"use client";

import * as yup from "yup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSwr, useUpdateSwr } from "./api";
import { ProductCompletionType, ProductCompletionStepType } from "@/types/modules/product";
import ProductCompletionSelect from "@/components/modules/product/completion/step/form/select";
import { AxiosError } from "axios";
// import { AxiosError, AxiosResponse } from "axios";

interface FormProps {
  productCompletion: ProductCompletionType;
  productCompletionStep?: ProductCompletionStepType;
  onComplete?: () => void;
}

export default function ProductCompletionStepForm({ productCompletion, productCompletionStep, onComplete }: FormProps) {
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr(productCompletion.id);
  const { trigger: triggerUpdate } = useUpdateSwr(productCompletion.id, productCompletionStep ? productCompletionStep.id : 0);

  const validationSchema = yup.object({
    productService: yup.string().required(),
    chargeService: yup.string().notRequired(),
    orderIndex: yup.number().integer().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    let mutatePromise;
    if (productCompletionStep && productCompletionStep.id) {
      mutatePromise = triggerUpdate(data);
    } else {
      console.log("create", data);
      mutatePromise = triggerCreate(data);
    }

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
          <ProductCompletionSelect
            label="ProductCompletionStepType"
            defaultValue={productCompletionStep?.productService ?? ""}
            {...register("productService")}
            error={errors.productService ? true : false}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Charge Service"}
            {...register("chargeService")}
            defaultValue={productCompletionStep?.chargeService ?? ""}
            fullWidth
            size="medium"
            error={errors.chargeService ? true : false}
            helperText={errors.chargeService?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"OrderIndex"}
            {...register("orderIndex")}
            defaultValue={productCompletionStep?.orderIndex ?? ""}
            fullWidth
            size="medium"
            error={errors.orderIndex ? true : false}
            helperText={errors.orderIndex?.message}
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
