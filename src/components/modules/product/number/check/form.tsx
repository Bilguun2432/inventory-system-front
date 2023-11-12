"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCreateSwr, useUpdateSwr } from "./api";

import { ProductNumberCheckType } from "@/types/modules/product";
// import { AxiosError, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { useState } from "react";

interface FormProps {
  productNumberCheck?: ProductNumberCheckType;
  onComplete?: () => void;
}

interface OptionType {
  name: string;
  value: string;
}

interface SelectOptionsType {
  options: OptionType[];
}

interface FormConfigType {
  fieldType: SelectOptionsType;
  relateType: SelectOptionsType;
}

const defaultFormConfig: FormConfigType = {
  fieldType: {
    options: [
      { name: "package_code", value: "package_code" },
      { name: "number_prefix", value: "number_prefix" },
    ],
  },
  relateType: {
    options: [
      { name: "allow", value: "allow" },
      { name: "block", value: "block" },
      { name: "require", value: "require" },
    ],
  },
};

export default function ProductNumberCheckForm(props: FormProps) {
  const theme = useTheme();
  const { productNumberCheck, onComplete } = props;
  const [formConfig, setFormConfig] = useState<FormConfigType | null>(defaultFormConfig);

  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(productNumberCheck?.id ? productNumberCheck?.id : 0);

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    fieldType: yup.string().required(),
    packageCode: yup.string(),
    numberPrefix: yup.string(),
    relateType: yup.string().required(),
    enabled: yup.boolean().default(false),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    let mutatePromise;
    if (productNumberCheck && productNumberCheck.id) {
      mutatePromise = triggerUpdate(data);
    } else {
      mutatePromise = triggerCreate(data);
    }

    mutatePromise
      // .then(function (response: AxiosResponse) {
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
          <TextField
            label={"Name"}
            {...register("name")}
            defaultValue={productNumberCheck ? productNumberCheck.name : ""}
            fullWidth
            size="medium"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <FormControl fullWidth>
            <InputLabel id="product_number_check_field_type">FieldType</InputLabel>
            <Select
              labelId="product_number_check_field_type"
              label={"FieldType"}
              defaultValue={productNumberCheck?.fieldType ?? ""}
              fullWidth
              size="medium"
              error={errors.fieldType ? true : false}
              {...register("fieldType")}
            >
              {formConfig?.fieldType?.options.map(function (opt: OptionType, index: number) {
                return (
                  <MenuItem value={opt.value} key={`product_number_check_option_${index}`}>
                    {opt.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Package Code"}
            {...register("packageCode")}
            defaultValue={productNumberCheck ? productNumberCheck.packageCode : ""}
            fullWidth
            size="medium"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Number Prefix"}
            {...register("numberPrefix")}
            defaultValue={productNumberCheck ? productNumberCheck.numberPrefix : ""}
            fullWidth
            size="medium"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <FormControl fullWidth>
            <InputLabel id="product_number_check_field_type">Relate Type</InputLabel>
            <Select
              labelId="product_number_check_field_type"
              label={"Relate Type"}
              defaultValue={productNumberCheck?.relateType ?? ""}
              fullWidth
              size="medium"
              error={errors.relateType ? true : false}
              {...register("relateType")}
            >
              {formConfig?.relateType?.options.map(function (opt: OptionType, index: number) {
                return (
                  <MenuItem value={opt.value} key={`product_number_check_option_${index}`}>
                    {opt.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <FormControlLabel
            control={<Checkbox defaultChecked={productNumberCheck ? productNumberCheck.enabled : false} {...register("enabled")} />}
            label="Enabled"
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"Description"}
            {...register("description")}
            defaultValue={productNumberCheck ? productNumberCheck.description : ""}
            fullWidth
            size="medium"
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            multiline
            rows={3}
          />
        </Box>

        <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(4) }}>
          <Button type={"submit"} variant="outlined" color="primary" size="medium">
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
