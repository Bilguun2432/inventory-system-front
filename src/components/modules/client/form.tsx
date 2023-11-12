"use client";

import React, { useRef, useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCreateSwr, useUpdateSwr, useDetailSwr } from "./api";
import { useListSwr } from "../auth/user/api";
import { ClientType } from "@/types/modules/client";
import ClientKindSelect from "@/components/modules/client/kind/form/select";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// import { AxiosError, AxiosResponse } from "axios";
import Loading from "@/components/loader/loader";
import { MessageType } from "@/types/component";
import FastMsgContext from "@/context/fast_msg_context";

interface FormProps {
  id?: number;
  onComplete?: () => void;
}

interface FastMessageObj {
  name?: string;
  description?: string;
}

interface ErrorBody {
  msg?: string;
  loc: [];
}

interface SelectData {
  firstname: string;
  id: number;
}

export default function ClientForm({ id, onComplete }: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const [authUserId, setAuthUserId] = useState<number | null>(null);
  const [fastMessageObj, setFastMessageObj] = useState<FastMessageObj | null>(
    null,
  );
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);
  const { data: data2 } = useListSwr();
  console.log({ data2 });
  const fastMsgContext = useContext(FastMsgContext);
  const entityEdit = useRef<ClientType | null>(null);

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly SelectData[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (!loading) return undefined;
    (async () => {
      setOptions([...data2]);
    })();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: ClientType = { ...data };
    entityEdit.current = clientLoad;
    setEntityLoading(false);
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    clientKindId: yup.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    try {
      let result;
      data["authUserId"] = authUserId;
      console.log("2,", { data });
      if (entityEdit.current && entityEdit.current.id)
        result = await triggerUpdate(data);
      else result = await triggerCreate(data);

      if (result.error) {
        fastMsgContext?.setAlertMsg(result.error, MessageType.error);
        if (result.body) {
          setFastMessageObj(null);
          result.body.forEach((e: ErrorBody) => {
            setFastMessageObj((prevState) => ({
              ...prevState,
              [e.loc[e.loc.length - 1]]: e.msg,
            }));
          });
        }
      } else {
        fastMsgContext?.setAlertMsg("Client created", MessageType.success);
        if (onComplete) onComplete();
      }
    } catch (exp) {
      console.error(exp);
    }
  };
  console.log("--------->", loading);

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
              error={
                errors.name
                  ? true
                  : false || fastMessageObj?.name
                  ? true
                  : false
              }
              helperText={errors.name?.message ?? fastMessageObj?.name}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"Description"}
              {...register("description")}
              defaultValue={
                entityEdit.current ? entityEdit.current.description : ""
              }
              fullWidth
              multiline={true}
              rows={3}
              error={
                errors.description
                  ? true
                  : false || fastMessageObj?.description
                  ? true
                  : false
              }
              helperText={
                errors.description?.message ?? fastMessageObj?.description
              }
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <ClientKindSelect
              label="Clientkind"
              defaultValue={
                entityEdit && entityEdit.current?.clientKindId
                  ? entityEdit.current.clientKindId
                  : 1
              }
              {...register("clientKindId")}
              error={errors.clientKindId ? true : false}
            />
          </Box>

          <Box sx={{ mb: theme.spacing(4) }}>
            <Autocomplete
              id="asynchronous-demo"
              sx={{ width: "100%" }}
              open={open}
              onOpen={() => {
                setOpen(true);
                console.log("open");
              }}
              onClose={() => {
                console.log("close");
                setOpen(false);
              }}
              onChange={(e, value) => {
                if (value) {
                  setAuthUserId(value.id);
                }
              }}
              isOptionEqualToValue={(options, value) => options.id === value.id}
              getOptionLabel={(options) => options.firstname}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={params.id}
                  key={`txtFieldkey_autocomplete_${params.id}`}
                  label="Asynchronous"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          {/* <Box sx={{ mb: theme.spacing(4) }}>
            <AuthUserSelect
              label="AuthUserID"
              defaultValue={
                entityEdit && entityEdit.current?.clientKindId
                  ? entityEdit.current.clientKindId
                  : 0
              }
              {...register("authUserId")}
              error={errors.authUserId ? true : false}
            />
          </Box>  */}

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
