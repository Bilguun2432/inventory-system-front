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
import { useCreateSwr, useUpdateSwr, useDetailSwr } from "./api";
import { NumberPrefixType } from "@/types/modules/number";
import { useState, useRef, useEffect } from "react";
import Loading from "@/components/loader/loader";

interface FormProps {
  id?: number;
  numberPrefix?: NumberPrefixType;
  onComplete?: () => void;
}

export default function NumberPrefixForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const { id, numberPrefix, onComplete } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);
  const theme = useTheme();
  const entityEdit = useRef<NumberPrefixType | null>(numberPrefix ?? null);

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
      const entityLoaded: NumberPrefixType = { ...data };
      if (entityLoaded && entityLoaded.id) {
        entityEdit.current = entityLoaded;
        setEntityLoading(false);
      }
    },
    [data, isLoading, error],
  );

  const validationSchema = yup.object({
    mainService: yup.string(),
    prefixValue: yup.string(),
    enabled: yup.boolean().default(true),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    console.log("=-===========", { submitData: data });
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

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {entityLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"mainService"}
              {...register("mainService")}
              defaultValue={entityEdit.current ? entityEdit.current.mainService : ""}
              fullWidth
              size="medium"
              error={errors.mainService ? true : false}
              helperText={errors.mainService?.message}
            />
          </Box>

          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"prefixValue"}
              {...register("prefixValue")}
              defaultValue={entityEdit.current ? entityEdit.current.prefixValue : ""}
              fullWidth
              rows={3}
              error={errors.prefixValue ? true : false}
              helperText={errors.prefixValue?.message}
            />
          </Box>

          <Box>
            <FormControlLabel control={<Checkbox defaultChecked={entityEdit.current?.enabled ?? false} {...register("enabled")} />} label="enabled" />
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
