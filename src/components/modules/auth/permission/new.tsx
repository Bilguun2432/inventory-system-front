"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import AuthPermissionForm from "./form";

interface AuthPermissionNewProps {
  onComplete?: () => void;
}

export default function AuthPermissionNew(props: AuthPermissionNewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <AuthPermissionForm onComplete={onComplete} />
    </Box>
  );
}
