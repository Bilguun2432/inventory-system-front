"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useDetailSwr } from "./api";
import ProductNumberCheckForm from "./form";
import { ProductNumberCheckType } from "@/types/modules/product";

interface EditProps {
  productNumberCheck: ProductNumberCheckType;
  onComplete?: () => void;
}

export default function ProductNumberCheckEdit(props: EditProps) {
  const theme = useTheme();
  const { productNumberCheck, onComplete } = props;
  const { data, mutate } = useDetailSwr(productNumberCheck.id);

  function onUpdateComplete() {
    if (onComplete) {
      mutate();
      onComplete();
    }
  }

  return <Box sx={{ my: theme.spacing(2) }}>{data && <ProductNumberCheckForm productNumberCheck={data} onComplete={onUpdateComplete} />}</Box>;
}
