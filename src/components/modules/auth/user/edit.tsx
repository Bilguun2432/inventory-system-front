"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductForm from "./form";

interface EditProps {
  id?: number;
  onComplete?: () => void;
}

export default function AuthUserEdit(props: EditProps) {
  const theme = useTheme();
  const { id, onComplete } = props;
  const { data, mutate } = useDetailSwr(id);

  function onUpdateComplete() {
    if (onComplete) {
      onComplete();
      mutate();
    }
  }

  return <Box sx={{ my: theme.spacing(2) }}>{data && <ProductForm authUser={data} onComplete={onUpdateComplete} />}</Box>;
}
