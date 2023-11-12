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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useCreateSwr, useUpdateSwr } from "./api";
// import { AxiosError, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { SystemSettingType } from "@/types/modules/system_setting";

interface FormProps {
  id?: number;
  systemSetting?: SystemSettingType;
  onComplete?: () => void;
}

export default function SystemSettingForm(props: FormProps) {
  const theme = useTheme();
  const { systemSetting, onComplete } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(
    systemSetting ? systemSetting.id : 0,
  );

  const validationSchema = yup.object({
    settingKey: yup.string().required(),
    value: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    console.log({ submitData: data });
    try {
      let result;
      if (systemSetting?.id) {
        result = await triggerUpdate(data);
      } else result = await triggerCreate(data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label="Setting Key"
            {...register("settingKey")}
            defaultValue={systemSetting ? systemSetting.settingKey : ""}
            fullWidth
            size="medium"
            error={!!errors.settingKey}
            helperText={errors?.settingKey?.message?.toString() ?? ""}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label="Value"
            {...register("value")}
            defaultValue={
              systemSetting?.value ? JSON.stringify(systemSetting.value) : ""
            }
            fullWidth
            size="medium"
            error={!!errors.value}
            helperText={errors?.value?.message?.toString() ?? ""}
            multiline
            rows={3}
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
    </Box>
  );
}
