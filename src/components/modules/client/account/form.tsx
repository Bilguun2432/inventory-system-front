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
import { ClientAccountType } from "@/types/modules/client";
import Loading from "@/components/loader/loader";

interface FormProps {
  id?: number;
  onComplete?: () => void;
}

export default function ClientAccountForm({ id, onComplete }: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);

  const entityEdit = useRef<ClientAccountType | null>(null);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: ClientAccountType = { ...data };
    entityEdit.current = clientLoad;
    console.log("entityEdit", entityEdit);
    setEntityLoading(false);
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    userCreatedId: yup.number().integer(),
    accountNumber: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    data["clientId"] = id;
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
              label={"accountNumber"}
              {...register("accountNumber")}
              defaultValue={
                entityEdit.current ? entityEdit.current.accountNumber : ""
              }
              fullWidth
              size="medium"
              error={errors.accountNumber ? true : false}
              helperText={errors.accountNumber?.message}
            />
          </Box>
          {entityEdit.current && !entityEdit.current.id && (
            <Box sx={{ mb: theme.spacing(4) }}>
              <TextField
                label={"userCreatedId"}
                {...register("userCreatedId")}
                defaultValue={
                  entityEdit.current ? entityEdit.current.userCreatedId : ""
                }
                fullWidth
                error={errors.userCreatedId ? true : false}
                helperText={errors.userCreatedId?.message}
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
