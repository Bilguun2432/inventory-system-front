"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { NumberPrefixFilterModelType } from "./list";

interface FormFilterProps {
  onFilterSubmit: (filterData: NumberPrefixFilterModelType) => void;
}

export default function FormFilter({ onFilterSubmit }: FormFilterProps) {
  const validationSchema = yup.object({
    mainService: yup.string(),
    prefixValue: yup.string(),
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
              label={"mainService"}
              {...register("mainService")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.mainService ? true : false}
              helperText={errors.mainService?.message}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              label={"prefixValue"}
              {...register("prefixValue")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.prefixValue ? true : false}
              helperText={errors.prefixValue?.message}
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
