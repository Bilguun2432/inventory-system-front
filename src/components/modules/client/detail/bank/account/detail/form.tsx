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
import { BankAccountType } from "@/types/modules/bank_account";

interface FormProps {
  id?: number;
  clientId?: any;
  onComplete?: () => void;
}

export default function BankAccountForm({
  id,
  onComplete,
  clientId,
}: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  // const [userData, setUserData] = useState();
  const [number, setNumber] = useState("");
  const [key, setKey] = useState("");
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);
  // console.log("data =>", data);
  const entityEdit = useRef<BankAccountType | null>(null);

  useEffect(
    function () {
      // console.log("data", data, entityEdit.current);
      if (isLoading) {
        return;
      }
      const bankAccountType: BankAccountType = { ...data };
      entityEdit.current = bankAccountType;
      setEntityLoading(false);
      // setUserData(data);
      setNumber(data?.accountNumber || "");
      setKey(data?.integrateKey || "");
    },
    [data, isLoading, error],
  );

  const validationSchema = yup.object({
    clientId: yup.number().integer(),
    integrateKey: yup.string().required(),
    accountNumber: yup.string().required(),
    // userCreatedId: yup
    //   .number()
    //   .transform((e) => (Number.isNaN(e) ? null : e))
    //   .nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    console.log(number);
    data.clientId = parseInt(clientId);
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
              label={"IntegrateKey"}
              {...register("integrateKey")}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              fullWidth
              multiline={true}
              error={errors.integrateKey ? true : false}
              helperText={errors.integrateKey?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"AccountNumber"}
              {...register("accountNumber")}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              fullWidth
              multiline={true}
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
