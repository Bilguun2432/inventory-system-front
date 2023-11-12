"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import ProductCompletionForm from "./form";

interface ProductNewProps {
  onComplete?: () => void;
}

export default function ProductNew(props: ProductNewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <ProductCompletionForm onComplete={onComplete} />
    </Box>
  );
}
