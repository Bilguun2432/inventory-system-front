"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductForm from "./form";

interface EditProps {
  id: number;
  onComplete?: () => void;
}

export default function ProductEdit(props: EditProps) {
  const theme = useTheme();
  const { id, onComplete } = props;
  const { data: productDetail } = useDetailSwr(id);

  return <Box sx={{ my: theme.spacing(2) }}>{productDetail && <ProductForm product={productDetail} onComplete={onComplete} />}</Box>;
}
