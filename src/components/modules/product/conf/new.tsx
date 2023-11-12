"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import ProductConfForm from "./form";

interface ProductConfNewProps {
  onComplete?: () => void;
}

export default function ProductConfNew(props: ProductConfNewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <ProductConfForm onComplete={onComplete} />
    </Box>
  );
}
