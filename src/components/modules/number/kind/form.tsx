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

import { useCreateSwr, useUpdateSwr } from "./api";
import { NumberKindType } from "@/types/modules/number";

interface FormProps {
  numberKind?: NumberKindType;
  onComplete?: () => void;
}

export default function NumberKindForm(props: FormProps) {
  const { numberKind, onComplete } = props;
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(numberKind?.id ?? 0);

  const validationSchema = yup.object({
    name: yup.string(),
    systemId: yup.number(),
    price: yup.number(),
    isSpecial: yup.boolean(),
    enabled: yup.boolean(),
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
      if (numberKind?.id) {
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
            label={"Name"}
            {...register("name")}
            defaultValue={numberKind?.name ?? ""}
            fullWidth
            size="medium"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"SystemId"}
            {...register("systemId")}
            defaultValue={numberKind?.systemId ?? ""}
            fullWidth
            rows={3}
            size="medium"
            error={errors.systemId ? true : false}
            helperText={errors.systemId?.message}
          />
        </Box>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Price"}
            {...register("price")}
            defaultValue={numberKind?.price ?? ""}
            fullWidth
            rows={3}
            size="medium"
            error={errors.price ? true : false}
            helperText={errors.price?.message}
          />
        </Box>

        <Box>
          <FormControlLabel control={<Checkbox defaultChecked={numberKind ? numberKind.isSpecial : false} {...register("isSpecial")} />} label="isSpecial" />
        </Box>

        <Box>
          <FormControlLabel control={<Checkbox defaultChecked={numberKind ? numberKind.enabled : false} {...register("enabled")} />} label="enabled" />
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
