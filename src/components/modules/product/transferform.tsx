"use client";

import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useTransferSwr } from "./transferapi";
import { ProductType } from "@/types/modules/product";
import Loading from "@/components/loader/loader";
import { AxiosError } from "axios";
import { TransferType } from "@/types/modules/transfer";
import { SubmitHandler } from "react-hook-form";

interface FormProps {
  product?: ProductType;
  onComplete?: () => void;
  selectedUser: string;
}

export default function TransferForm(props: FormProps) {
  const { product, selectedUser, onComplete } = props;
  const { trigger: triggerTransfer } = useTransferSwr();
  const theme = useTheme();

  const validationSchema = yup.object({
    transferUnit: yup
      .number()
      .typeError("Тоогоо оруулна уу")
      .max(product?.unit || 0, "Бүтээгдэхүүний оруулах тоо дээрх бүтээгдэхүүнээс бага байх ёстой"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    if (product) {
      data.productId = product.id;
    } else {
      console.error("Product is undefined");
      return;
    }
    data.email = selectedUser;
    let mutatePromise;

    mutatePromise = triggerTransfer(data);

    mutatePromise
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
          <TextField label={"Ажилчны мэйл хаяг"} defaultValue={selectedUser ?? ""} fullWidth size="medium" InputProps={{ readOnly: true }} />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField label={"Бүтээгдэхүүний нэр"} defaultValue={product ? product.name : ""} fullWidth size="medium" InputProps={{ readOnly: true }} />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Бүтээгдэхүүний дэлгэрэнгүй"}
            defaultValue={product ? product.description : ""}
            fullWidth
            size="medium"
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField label={"Бүтээгдэхүүний тоо"} defaultValue={product ? product.unit : ""} fullWidth size="medium" InputProps={{ readOnly: true }} />
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

        <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(4) }}>
          <Button type={"submit"} variant="outlined" color="primary" size="medium">
            Шилжүүлэх
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
