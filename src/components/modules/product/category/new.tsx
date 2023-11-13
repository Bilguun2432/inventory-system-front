"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import ProductCategoryForm from "./form";

interface ProductCategoryNewProps {
  onComplete?: () => void;
}

export default function ProductCategoryNew(props: ProductCategoryNewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <ProductCategoryForm onComplete={onComplete} />
    </Box>
  );
}
