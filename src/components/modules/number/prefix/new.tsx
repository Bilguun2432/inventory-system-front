"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import NumberPrefixForm from "./form";

interface NumberPrefixNewProps {
  onComplete?: () => void;
}

export default function NumberPrefixNew(props: NumberPrefixNewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <NumberPrefixForm onComplete={onComplete} />
    </Box>
  );
}
