"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import SystemSettingForm from "./form";

interface SystemSettingNewProps {
  onComplete?: () => void;
}

export default function ProductNew(props: SystemSettingNewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <SystemSettingForm onComplete={onComplete} />
    </Box>
  );
}
