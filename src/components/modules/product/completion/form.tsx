import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ProductCompletionSelect from "@/components/modules/product/completion/step/form/select";

import { useCreateSwr, useUpdateSwr } from "./api";
import { ProductCompletionType } from "@/types/modules/product";
import Loading from "@/components/loader/loader";

interface FormProps {
  productCompletion?: ProductCompletionType;
  onComplete?: () => void;
}

export default function ProductCompletionForm({
  productCompletion,
  onComplete,
}: FormProps) {
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(
    productCompletion ? productCompletion.id : 0,
  );

  const validationSchema = yup.object({
    name: yup.string().required(),
    productService: yup.string().required(),
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    let result;
    if (productCompletion && productCompletion.id) {
      result = await triggerUpdate(data);
    } else {
      result = await triggerCreate(data);
    }
    console.log({ result });
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Name"}
            {...register("name")}
            defaultValue={productCompletion ? productCompletion.name : ""}
            fullWidth
            size="medium"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <ProductCompletionSelect
            label="Product Service"
            defaultValue={productCompletion?.productService ?? ""}
            {...register("productService")}
            error={errors.productService ? true : false}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Description"}
            {...register("description")}
            defaultValue={
              productCompletion ? productCompletion.description : ""
            }
            fullWidth
            multiline={true}
            rows={3}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />
        </Box>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          sx={{ mb: theme.spacing(4) }}
        >
          <Button
            type={"submit"}
            variant="outlined"
            color="primary"
            size="medium"
          >
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
