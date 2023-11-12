"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductCompletionForm from "./form";

interface EditProps {
  id: number;
  onComplete?: () => void;
}

export default function ProductCompletionEdit(props: EditProps) {
  const theme = useTheme();
  const { id, onComplete } = props;
  // const { data: productDetail, error, isLoading } = useDetailSwr(id);
  const { data: productDetail } = useDetailSwr(id);

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {productDetail && (
        <ProductCompletionForm
          productCompletion={productDetail}
          onComplete={onComplete}
        />
      )}
    </Box>
  );
}
