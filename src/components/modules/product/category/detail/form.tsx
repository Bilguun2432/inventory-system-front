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
import { ProductCategoryType } from "@/types/modules/product";
import Loading from "@/components/loader/loader";

interface FormProps {
  id?: number;
  productCategory?: ProductCategoryType;
  onComplete?: () => void;
}

export default function ProductCategoryForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(true);
  const { id, productCategory, onComplete } = props;
  const { trigger: triggerCreate } = useCreateSwr();
  const { trigger: triggerUpdate } = useUpdateSwr(id && id > 0 ? id : 0);
  const { data, error, isLoading } = useDetailSwr(id && id > 0 ? id : 0);
  const theme = useTheme();

  const entityEdit = useRef<ProductCategoryType | null>(
    productCategory ?? null,
  );
  console.log("entityEdit1", entityEdit);

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
      const entityLoaded: ProductCategoryType = { ...data };
      if (entityLoaded && entityLoaded.id) {
        entityEdit.current = entityLoaded;
        setEntityLoading(false);
      }
    },
    [data, isLoading, error],
  );

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    console.log({ submitData: data });
    console.log(entityEdit);
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
              defaultValue={
                entityEdit.current ? entityEdit.current.description : ""
              }
              fullWidth
              multiline={true}
              rows={3}
              error={errors.description ? true : false}
              helperText={errors.description?.message}
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
