"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import ProductNumberCheckForm from "./form";

interface NewProps {
  onComplete?: () => void;
}

export default function ProductNumberCheckNew(props: NewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <ProductNumberCheckForm onComplete={onComplete} />
    </Box>
  );
}
