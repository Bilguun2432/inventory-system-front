"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { ProductFilterModelType } from "./list";

interface FormFilterProps {
  onFilterSubmit: (filterData: ProductFilterModelType) => void;
}

export default function FormFilter({ onFilterSubmit }: FormFilterProps) {
  const validationSchema = yup.object({
    name: yup.string(),
    description: yup.string(),
    priceMin: yup.number().notRequired().nullable(),
    priceMax: yup.number().notRequired().nullable(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      priceMin: null,
      priceMax: null,
    },
  });

  function onSubmit(data: any) {
    onFilterSubmit(data);
  }

  return (
    <>
      <Box sx={{ my: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <TextField label={"Name"} {...register("name")} fullWidth size="medium" error={errors.name ? true : false} helperText={errors.name?.message} />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              label={"Description"}
              {...register("description")}
              fullWidth
              size="medium"
              error={errors.description ? true : false}
              helperText={errors.description?.message}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              label={"Price minimum"}
              {...register("priceMin")}
              fullWidth
              size="medium"
              error={errors.priceMin ? true : false}
              helperText={errors.priceMin?.message}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              label={"Price maximum"}
              {...register("priceMax")}
              fullWidth
              size="medium"
              error={errors.priceMax ? true : false}
              helperText={errors.priceMax?.message}
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
