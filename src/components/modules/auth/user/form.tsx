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
import { useCreateSwr, useDetailSwr, useUpdateSwr } from "./api";
import { AuthUserType } from "@/types/modules/auth_user";
import Loading from "@/components/loader/loader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface FormProps {
  id?: number;
  authUser?: AuthUserType;
  onComplete?: () => void;
}

export default function AuthUserForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const { id, authUser, onComplete } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);
  const theme = useTheme();

  const entityEdit = useRef<AuthUserType | null>(authUser ?? null);

  function isEditLoad() {
    if (id && id > 0 && entityEdit.current === null) {
      return true;
    }
    return false;
  }

  useEffect(
    function () {
      if (!isEditLoad()) {
        setEntityLoading(false);
        return;
      }
      if (isLoading) {
        return;
      }
      const entityLoaded: AuthUserType = { ...data };
      if (entityLoaded && entityLoaded.id) {
        entityEdit.current = entityLoaded;
        console.log(entityEdit.current);

        setEntityLoading(false);
      }
    },
    [data, isLoading, error],
  );

  const validationSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required(),
    mobile: yup.string().required(),
    userType: yup.string().required(),
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
      if (entityEdit.current && entityEdit.current.id) {
        result = await triggerUpdate(data);
      } else {
        result = await triggerCreate(data);
      }
      console.log({ result });

      if (onComplete) {
        onComplete();
      }
    } catch (exp) {
      console.error(exp);
    }
  };
  // console.log(data);
  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {entityLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"firstname"}
              {...register("firstname")}
              defaultValue={entityEdit.current ? entityEdit.current.firstname : ""}
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
              defaultValue={entityEdit.current ? entityEdit.current.lastname : ""}
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
              defaultValue={entityEdit.current ? entityEdit.current.email : ""}
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
              defaultValue={entityEdit.current ? entityEdit.current.mobile : ""}
              fullWidth
              rows={3}
              error={errors.mobile ? true : false}
              helperText={errors.mobile?.message}
            />
          </Box>

          <Box sx={{ mb: theme.spacing(4) }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">userType</InputLabel>
              <Select label={"userType"} {...register("userType")} defaultValue={""} fullWidth size="medium" error={errors.userType ? true : false}>
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"USER"}>USER</MenuItem>
                <MenuItem value={"MERCHANT"}>MERCHANT</MenuItem>
                <MenuItem value={"APP"}>APP</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"password"}
              {...register("password")}
              defaultValue={entityEdit.current ? entityEdit.current.mobile : ""}
              fullWidth
              rows={3}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
            />
          </Box> */}

          <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(4) }}>
            <Button type={"submit"} variant="outlined" color="primary" size="medium">
              Save
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
