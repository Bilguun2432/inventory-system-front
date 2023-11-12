"use client";

import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useCreateSwr, useUpdateSwr, useDetailSwr } from "./api";
import { ClientProductType } from "@/types/modules/client";

interface FormProps {
  id?: number;
  onComplete?: () => void;
}

export default function AD(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const { id, onComplete } = props;
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);

  const entityEdit = useRef<ClientProductType | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: ClientProductType = { ...data };
    entityEdit.current = clientLoad;
    console.log("entityEdit", entityEdit);
    setEntityLoading(false);
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    clientId: yup.number().required(),
    productId: yup.number().required(),
    useCustomPrice: yup.bool().required(),
    price: yup.number().required(),
    userCreatedId: yup
      .number()
      .transform((e) => (Number.isNaN(e) ? null : e))
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    console.log({ submitData: data });
    console.log(entityEdit);
    try {
      let result;
      if (entityEdit.current && entityEdit.current.id)
        result = await triggerUpdate(data);
      else result = await triggerCreate(data);
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
      {entityLoading ? (
        <h4>Loading...</h4>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"ClientId"}
              {...register("clientId")}
              defaultValue={
                entityEdit.current ? entityEdit.current.clientId : ""
              }
              fullWidth
              size="medium"
              error={errors.clientId ? true : false}
              helperText={errors.clientId?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"ProductId"}
              {...register("productId")}
              defaultValue={
                entityEdit.current ? entityEdit.current.productId : ""
              }
              fullWidth
              size="medium"
              error={errors.productId ? true : false}
              helperText={errors.productId?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"useCustomPrice"}
              {...register("useCustomPrice")}
              defaultValue={
                entityEdit.current ? entityEdit.current.useCustomPrice : ""
              }
              fullWidth
              size="medium"
              error={errors.useCustomPrice ? true : false}
              helperText={errors.useCustomPrice?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"price"}
              {...register("price")}
              defaultValue={entityEdit.current ? entityEdit.current.price : ""}
              fullWidth
              size="medium"
              error={errors.price ? true : false}
              helperText={errors.price?.message}
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
      )}
    </Box>
  );
}
