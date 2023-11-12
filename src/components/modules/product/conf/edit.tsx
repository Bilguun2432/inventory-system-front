"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductForm from "./form";
import { ProductConfType } from "@/types/modules/product";

interface EditProps {
  productConf: ProductConfType;
  onComplete?: () => void;
}

export default function ProductConfEdit(props: EditProps) {
  const theme = useTheme();
  const { productConf, onComplete } = props;
  const { data, mutate } = useDetailSwr(productConf.id);

  function onUpdateComplete() {
    if (onComplete) {
      mutate();
      onComplete();
    }
  }

  return <Box sx={{ my: theme.spacing(2) }}>{data && <ProductForm productConf={data} onComplete={onUpdateComplete} />}</Box>;
}
