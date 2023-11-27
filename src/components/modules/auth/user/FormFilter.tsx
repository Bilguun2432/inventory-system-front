"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { AuthUserFilterModelType } from "./list";

interface FormFilterProps {
  onFilterSubmit: (filterData: AuthUserFilterModelType) => void;
}

export default function FormFilter({ onFilterSubmit }: FormFilterProps) {
  const validationSchema = yup.object({
    firstname: yup.string(),
    lastname: yup.string(),
    email: yup.string(),
    mobile: yup.number().transform((value, originalValue) => {
      return originalValue === "" ? 0 : Number(originalValue);
    }),
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
              label={"firstname"}
              {...register("firstname")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.firstname ? true : false}
              helperText={errors.firstname?.message}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              label={"lastname"}
              {...register("lastname")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.lastname ? true : false}
              helperText={errors.lastname?.message}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              label={"email"}
              {...register("email")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              label={"mobile"}
              {...register("mobile")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.mobile ? true : false}
              helperText={errors.mobile?.message}
            />
          </Box>

          <Stack direction={"row"} justifyContent={"end"} sx={{ mb: 4 }}>
            <Button type={"submit"} variant="outlined" color="info" startIcon={<SearchIcon />}>
              Search
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
