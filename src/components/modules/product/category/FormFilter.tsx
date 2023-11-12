"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { ProductCategoryFilterModelType } from "./list";

interface FormFilterProps {
  onFilterSubmit: (filterData: ProductCategoryFilterModelType) => void;
}

export default function FormFilter({ onFilterSubmit }: FormFilterProps) {
  const validationSchema = yup.object({
    name: yup.string(),
    description: yup.string(),
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
              label={"Name"}
              {...register("name")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.name ? true : false}
              helperText={errors.name?.message}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              label={"Description"}
              {...register("description")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.description ? true : false}
              helperText={errors.description?.message}
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
