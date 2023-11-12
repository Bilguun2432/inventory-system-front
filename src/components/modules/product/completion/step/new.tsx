"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ProductCompletionType } from "@/types/modules/product";

import ProductCompletionStepForm from "./form";

interface ProductNewProps {
  productCompletion: ProductCompletionType;
  onComplete?: () => void;
}

export default function ProductCompletionStepNew(props: ProductNewProps) {
  const theme = useTheme();
  const { productCompletion, onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <ProductCompletionStepForm
        productCompletion={productCompletion}
        onComplete={onComplete}
      />
    </Box>
  );
}
