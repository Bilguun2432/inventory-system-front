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
import { NumberKindPatternType } from "@/types/modules/number";
import { AxiosError } from "axios";

interface FormProps {
  id?: number;
  numberKindId?: any;
  onComplete?: () => void;
  numberKindPattern?: NumberKindPatternType;
}

export default function NumberKindPatternForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState({});
  const { id, numberKindId, numberKindPattern, onComplete } = props;
  const [pattern, setPattern] = useState("");
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);

  const entityEdit = useRef<NumberKindPatternType | null>(null);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    const numberKindload: NumberKindPatternType = { ...data };
    entityEdit.current = numberKindload;
    setEntityLoading(false);
    console.log(data);
    setUserData(data);
    setPattern(data?.pattern ?? "");
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    pattern: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    data.numberKindId = parseInt(numberKindId);

    console.log("aaaaaaaaaaasdewqrrrrrrrrrrrrrrrrr", data);
    try {
      let result;
      if (entityEdit.current && entityEdit.current.id)
        result = triggerUpdate(data);
      else result = triggerCreate(data);
      result
        .then(function () {
          if (onComplete) {
            onComplete();
          }
        })
        .catch(function (error: AxiosError) {
          console.log({ error });
        });
    } catch (exp) {
      console.error(exp);
    }
  };

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {entityLoading ? (
        <h4>Loading...</h4>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"Pattern"}
              {...register("pattern")}
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              fullWidth
              error={errors.pattern ? true : false}
              helperText={errors.pattern?.message}
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
      )}
    </Box>
  );
}
