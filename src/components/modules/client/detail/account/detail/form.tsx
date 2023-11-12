import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useCreateSwr, useUpdateSwr, useDetailClientAccountSwr } from "./api";
import { ClientAccountType } from "@/types/modules/client";
import { AxiosError } from "axios";
// import { AxiosError, AxiosResponse } from "axios";

interface FormProps {
  id?: number;
  clientId?: any;
  onComplete?: () => void;
}

export default function ClientAccountForm({
  id,
  onComplete,
  clientId,
}: FormProps) {
  const theme = useTheme();
  const [number, setNumber] = useState("");
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailClientAccountSwr(
    id && id > 0 ? id : 0,
  );

  const entityEdit = useRef<ClientAccountType | null>(null);
  // console.log(data);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: ClientAccountType = { ...data };
    entityEdit.current = clientLoad;
    // console.log("entityEdit", entityEdit);
    setEntityLoading(false);
    setNumber(data?.accountNumber ?? "");
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    clientId: yup.number().integer(),
    accountNumber: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    data.clientId = parseInt(clientId);

    console.log({ submitData: data });
    try {
      let result;
      if (entityEdit.current && entityEdit.current.id)
        result = triggerUpdate(data);
      else result = triggerCreate(data);

      result
        // .then(function (response: AxiosResponse) {
        .then(function () {
          if (onComplete) {
            onComplete();
          }
        })
        .catch(function (error: AxiosError) {
          console.log({ error });
        });
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
              label={"accountNumber"}
              {...register("accountNumber")}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              // defaultValue={
              //   entityEdit.current ? entityEdit.current.accountNumber : ""
              // }
              fullWidth
              multiline={true}
              size="medium"
              error={errors.accountNumber ? true : false}
              helperText={errors.accountNumber?.message}
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
