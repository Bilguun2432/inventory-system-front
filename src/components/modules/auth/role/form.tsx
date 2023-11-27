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

import { useCreateSwr, useUpdateSwr, useDetailSwr } from "./api";
import { AuthRoleType } from "@/types/modules/auth_role";
import Loading from "@/components/loader/loader";

interface FormProps {
  id?: number;
  onComplete?: () => void;
}

export default function AuthRoleForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const { id, onComplete } = props;
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);
  const entityEdit = useRef<AuthRoleType | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: AuthRoleType = { ...data };
    entityEdit.current = clientLoad;
    setEntityLoading(false);
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    try {
      let result;
      if (entityEdit.current && entityEdit.current.id) result = await triggerUpdate(data);
      else result = await triggerCreate(data);
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
      {entityLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"Name"}
              {...register("name")}
              defaultValue={entityEdit.current ? entityEdit.current.name : ""}
              fullWidth
              size="medium"
              error={errors.name ? true : false}
              helperText={errors.name?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"Description"}
              {...register("description")}
              defaultValue={entityEdit.current ? entityEdit.current.description : ""}
              fullWidth
              multiline
              rows={3}
              size="medium"
              error={errors.description ? true : false}
              helperText={errors.description?.message}
            />
          </Box>

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
