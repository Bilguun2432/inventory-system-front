"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductForm from "./form";
import { ProductType } from "@/types/modules/product";

interface EditProps {
  product: ProductType;
  onComplete?: () => void;
}

export default function ProductEdit(props: EditProps) {
  const theme = useTheme();
  const { product, onComplete } = props;
  const { data, mutate } = useDetailSwr(product.id);

  function onUpdateComplete() {
    if (onComplete) {
      mutate();
      onComplete();
    }
  }

  return <Box sx={{ my: theme.spacing(2) }}>{data && <ProductForm product={data} onComplete={onUpdateComplete} />}</Box>;
}
