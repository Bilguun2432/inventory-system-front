"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { TransactionFilterModelType } from "./list";

interface FormFilterProps {
  onFilterSubmit: (filterData: TransactionFilterModelType) => void;
}

export default function FormFilter({ onFilterSubmit }: FormFilterProps) {
  const validationSchema = yup.object({
    transactionCode: yup.string(),
    priceTotal: yup.string(),
    statePayment: yup.string(),
    state: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data: any) {
    onFilterSubmit(data);
  }

  return (
    <>
      <Box sx={{ my: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <TextField
              label={"transactionCode"}
              {...register("transactionCode")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.transactionCode ? true : false}
              helperText={errors.transactionCode?.message}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              label={"priceTotal"}
              {...register("priceTotal")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.priceTotal ? true : false}
              helperText={errors.priceTotal?.message}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              label={"statePayment"}
              {...register("statePayment")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.statePayment ? true : false}
              helperText={errors.statePayment?.message}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              label={"state"}
              {...register("state")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.state ? true : false}
              helperText={errors.state?.message}
            />
          </Box>

          <Stack direction={"row"} justifyContent={"end"} sx={{ mb: 4 }}>
            <Button type={"submit"} variant="outlined" color="primary" startIcon={<SearchIcon />}>
              Search
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
