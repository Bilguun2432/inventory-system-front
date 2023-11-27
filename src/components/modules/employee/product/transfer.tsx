"use client";

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useDetailSwr, useTransferSwr } from "./api";
import { useActionStatusSwr } from "./actionstatus";
import { AxiosError } from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUserSwr } from "@/components/modules/auth/user/api";
import { AuthUserProductType } from "@/types/modules/auth_user_product";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ActionStatusType } from "@/types/modules/action_status";
import FormHelperText from "@mui/material/FormHelperText";
import { useSession } from "next-auth/react";
import { useDetailEmailSwr } from "./userapi";

interface EditProps {
  authUserProduct: AuthUserProductType;
  onComplete?: () => void;
  setTransferComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthUserProductTransfer(props: EditProps) {
  const theme = useTheme();
  const { authUserProduct, onComplete, setTransferComplete } = props;
  const { data: actionStatus, mutate } = useActionStatusSwr();
  const { trigger: triggerTransfer } = useTransferSwr();

  const { data } = useSession();
  const { data: authUser } = useDetailEmailSwr(data?.user?.email);

  const validationSchema = yup.object({
    actionStatusId: yup.number().required("Төлвийг сонгоно уу."),
    description: yup.string().nullable(),
    transferUnit: yup
      .number()
      .typeError("Тоогоо оруулна уу")
      .max(authUserProduct?.unit || 0, "Бүтээгдэхүүний оруулах тоо дээрх бүтээгдэхүүнээс бага байх ёстой"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    data.authUserProduct = authUserProduct;
    data.authUserId = authUser.id;
    console.log("data=>", data);
    let mutatePromise;

    mutatePromise = triggerTransfer(data);

    mutatePromise
      .then(function () {
        if (onComplete) {
          mutate();
          setTransferComplete(true);
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
          <TextField
            label={"Ангилал"}
            defaultValue={authUserProduct ? authUserProduct.product?.category.name : ""}
            fullWidth
            size="medium"
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Бүтээгдэхүүний нэр"}
            defaultValue={authUserProduct ? authUserProduct.product?.name : ""}
            fullWidth
            size="medium"
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Бүтээгдэхүүний дэлгэрэнгүй"}
            defaultValue={authUserProduct ? authUserProduct.product?.description : ""}
            fullWidth
            size="medium"
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Бүтээгдэхүүний тоо"}
            defaultValue={authUserProduct ? authUserProduct.unit : ""}
            fullWidth
            size="medium"
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Шилжүүлэх тоо"}
            {...register("transferUnit")}
            fullWidth
            size="medium"
            error={errors.transferUnit ? true : false}
            helperText={errors.transferUnit?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <FormControl fullWidth error={errors.actionStatusId ? true : false}>
            <InputLabel id="actionStatusLabel">Төлөв</InputLabel>
            <Select labelId="actionStatusLabel" label="Төлөв" {...register("actionStatusId")} fullWidth size="medium">
              {actionStatus?.map((status: ActionStatusType) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.status}
                </MenuItem>
              ))}
            </Select>
            {errors.actionStatusId && <FormHelperText>{errors.actionStatusId.message}</FormHelperText>}
          </FormControl>
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Тайлбар"}
            {...register("description")}
            fullWidth
            size="medium"
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />
        </Box>

        <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(4) }}>
          <Button type={"submit"} variant="outlined" color="primary" size="medium">
            Бүртгэх
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
