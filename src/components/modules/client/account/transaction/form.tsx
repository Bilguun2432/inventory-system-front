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
import { ClientAccountTransactionType } from "@/types/modules/client";
import Loading from "@/components/loader/loader";

interface FormProps {
  id?: number;
  onComplete?: () => void;
}

export default function ClientAccountTransactionForm({
  id,
  onComplete,
}: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);

  const entityEdit = useRef<ClientAccountTransactionType | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: ClientAccountTransactionType = { ...data };
    entityEdit.current = clientLoad;
    console.log("entityEdit", entityEdit);
    setEntityLoading(false);
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    transactionCode: yup.string().required(),
    transactionId: yup.number().integer(),
    amount: yup.number().integer(),
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
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"transactionCode"}
              {...register("transactionCode")}
              defaultValue={
                entityEdit.current ? entityEdit.current.transactionCode : ""
              }
              fullWidth
              size="medium"
              error={errors.transactionCode ? true : false}
              helperText={errors.transactionCode?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"transactionId"}
              {...register("transactionId")}
              defaultValue={
                entityEdit.current ? entityEdit.current.transactionId : ""
              }
              fullWidth
              multiline={true}
              rows={3}
              error={errors.transactionId ? true : false}
              helperText={errors.transactionId?.message}
            />
          </Box>
          {entityEdit.current && !entityEdit.current.id && (
            <Box sx={{ mb: theme.spacing(4) }}>
              <TextField
                label={"amount"}
                {...register("amount")}
                defaultValue={
                  entityEdit.current ? entityEdit.current.amount : ""
                }
                fullWidth
                error={errors.amount ? true : false}
                helperText={errors.amount?.message}
              />
            </Box>
          )}

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
