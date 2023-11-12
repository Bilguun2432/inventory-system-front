import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useCreateSwr, useUpdateSwr } from "./api";
import { ProductAttributeType } from "@/types/modules/product";
import { ProductType } from "@/types/modules/product";

interface FormProps {
  product?: ProductType;
  productAttribute?: ProductAttributeType;
  onComplete?: () => void;
}

export default function ProductAttributeForm(props: FormProps) {
  const { productAttribute, onComplete, product } = props;
  const theme = useTheme();
  const productWithId = product as ProductType & { id: number };
  const { trigger: triggerCreate } = useCreateSwr(productWithId.id);
  const { trigger: triggerUpdate } = useUpdateSwr(
    productWithId.id,
    productAttribute?.id ?? 0,
  );

  const validationSchema = yup.object({
    systemField: yup.string(),
    priceExtra: yup.number(),
    translateDefault: yup.object({
      name: yup.string(),
      description: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    console.log({ submitData: data });
    try {
      let result;
      if (productAttribute?.id) {
        result = await triggerUpdate(data);
      } else result = await triggerCreate(data);
      console.log({ result });
      if (onComplete) {
        onComplete();
      }
    } catch (exp) {
      console.error(exp);
    }
  };

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"SystemField"}
            {...register("systemField")}
            defaultValue={productAttribute?.systemField ?? ""}
            fullWidth
            size="medium"
            error={errors.systemField ? true : false}
            helperText={errors.systemField?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"PriceExtra"}
            {...register("priceExtra")}
            defaultValue={productAttribute?.priceExtra ?? ""}
            fullWidth
            rows={3}
            size="medium"
            error={errors.priceExtra ? true : false}
            helperText={errors.priceExtra?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Name"}
            {...register("translateDefault.name")}
            defaultValue={productAttribute?.translates[0]?.name ?? ""}
            fullWidth
            rows={3}
            size="medium"
            error={errors.translateDefault?.name ? true : false}
            helperText={errors.translateDefault?.name?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Description"}
            {...register("translateDefault.description")}
            defaultValue={productAttribute?.translates[0]?.description ?? ""}
            fullWidth
            rows={3}
            size="medium"
            error={errors.translateDefault?.description ? true : false}
            helperText={errors.translateDefault?.description?.message}
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
