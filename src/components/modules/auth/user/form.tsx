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
import { useCreateSwr, useUpdateSwr, useListRoleSwr } from "./api";
import { AuthUserType } from "@/types/modules/auth_user";
import { AuthRoleType } from "@/types/modules/auth_role";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { AxiosError } from "axios";

interface FormProps {
  authUser?: AuthUserType;
  onComplete?: () => void;
}

export default function AuthUserForm(props: FormProps) {
  const { onComplete, authUser } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(authUser?.id ?? 0);
  const { data: roleData } = useListRoleSwr();
  const theme = useTheme();

  const validationSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required(),
    mobile: yup.string().required(),
    authRoleId: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    let mutatePromise;
    if (authUser && authUser.id) {
      mutatePromise = triggerUpdate(data);
    } else {
      console.log("data=>", data);
      mutatePromise = triggerCreate(data);
    }

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
          <TextField
            label={"firstname"}
            {...register("firstname")}
            defaultValue={authUser?.firstname ?? ""}
            fullWidth
            size="medium"
            error={errors.firstname ? true : false}
            helperText={errors.firstname?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"lastname"}
            {...register("lastname")}
            defaultValue={authUser?.lastname ?? ""}
            fullWidth
            rows={3}
            error={errors.lastname ? true : false}
            helperText={errors.lastname?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"email"}
            {...register("email")}
            defaultValue={authUser?.email ?? ""}
            fullWidth
            rows={3}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <TextField
            label={"mobile"}
            {...register("mobile")}
            defaultValue={authUser?.mobile ?? ""}
            fullWidth
            rows={3}
            error={errors.mobile ? true : false}
            helperText={errors.mobile?.message}
          />
        </Box>

        <Box sx={{ mb: theme.spacing(4) }}>
          <InputLabel htmlFor="roleSelect">Select Role:</InputLabel>
          <Select id="roleSelect" {...register("authRoleId")} defaultValue={authUser?.authRoleId ?? ""} fullWidth>
            {Array.isArray(roleData) &&
              roleData.map((role: AuthRoleType) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
          </Select>
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
