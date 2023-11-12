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

import { useCreateSwr, useUpdateSwr, useDetailclientproductSwr } from "./api";
import { ClientProductType } from "@/types/modules/client";
// import { ProductType } from "@/types/modules/product";
import ClientProductSelect from "@/components/modules/product/form/select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
// import { AxiosError, AxiosResponse } from "axios";

interface FormProps {
  id?: number;
  clientId?: any;
  onComplete?: () => void;
}

export default function ClientProductForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState({});
  const { id, clientId, onComplete } = props;
  const [price, setPrice] = useState("");
  const [checkbox, setCheckBox] = useState(true);
  const theme = useTheme();
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailclientproductSwr(
    id && id > 0 ? id : 0,
  );

  const entityEdit = useRef<ClientProductType | null>(null);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    const clientLoad: ClientProductType = { ...data };
    entityEdit.current = clientLoad;
    // console.log("entityEdit", entityEdit);
    // setNumber(number + 1);
    setEntityLoading(false);
    console.log(data);
    setUserData(data);
    setPrice(data?.price ?? "");
    // console.log("data.useCustomPrice", data.useCustomPrice);
    setCheckBox(data?.useCustomPrice ?? true);
  }, [data, isLoading, error]);

  const validationSchema = yup.object({
    clientId: yup.number().integer(),
    productId: yup.number().required(),
    useCustomPrice: yup.bool().required(),
    price: yup.number().required(),
    // userCreatedId: yup
    //   .number()
    //   .transform((e) => (Number.isNaN(e) ? null : e))
    //   .nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    data.clientId = parseInt(clientId);
    console.log("asdasdavsdvvegsvd", data);
    try {
      let result;
      if (entityEdit.current && entityEdit.current.id)
        result = triggerUpdate(data);
      else result = triggerCreate(data);
      result
        // .then(function (response: AxiosResponse) {
        .then(function () {
          if (onComplete) {
            // console.log("onComplete add");
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
  // console.log("render");
  console.log("obj=>", userData);
  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {entityLoading ? (
        <h4>Loading...</h4>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <ClientProductSelect
              label="Product"
              defaultValue={
                entityEdit && entityEdit.current?.productId
                  ? entityEdit.current.productId
                  : 0
              }
              {...register("productId")}
              error={errors.productId ? true : false}
            />
          </Box>

          <Box sx={{ mb: theme.spacing(4) }}>
            <FormControlLabel
              label="useCustomPrice"
              control={
                <Checkbox
                  {...register("useCustomPrice")}
                  defaultChecked={
                    entityEdit.current
                      ? entityEdit.current.useCustomPrice
                      : false
                  }
                  // defaultChecked={checkbox}
                  value={checkbox}
                  onChange={(e) => {
                    setCheckBox(e.target.checked);
                  }}
                  onError={() => {}}
                />
              }
            />
            <Typography variant="caption" color="error">
              {errors.useCustomPrice?.message}
            </Typography>
          </Box>

          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"price"}
              {...register("price")}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              multiline={true}
              error={errors.price ? true : false}
              helperText={errors.price?.message}
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
