"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductCompletionStepForm from "./form";
import { ProductCompletionType } from "@/types/modules/product";

interface EditProps {
  productCompletion: ProductCompletionType;
  id: number;
  onComplete?: () => void;
}

export default function ProductCompletionStepEdit(props: EditProps) {
  const theme = useTheme();
  const { productCompletion, id, onComplete } = props;
  const { data: productCompletionStep, mutate } = useDetailSwr(
    productCompletion.id,
    id,
  );

  function onEditComplete() {
    mutate();
    if (onComplete) {
      onComplete();
    }
  }

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {productCompletionStep && (
        <ProductCompletionStepForm
          productCompletion={productCompletion}
          productCompletionStep={productCompletionStep}
          onComplete={onEditComplete}
        />
      )}
    </Box>
  );
}
