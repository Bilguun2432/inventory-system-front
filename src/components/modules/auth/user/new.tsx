"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import AuthUserForm from "./form";

interface AuthUserNewProps {
  onComplete?: () => void;
}

export default function AuthUserNew(props: AuthUserNewProps) {
  const theme = useTheme();
  const { onComplete } = props;

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <AuthUserForm onComplete={onComplete} />
    </Box>
  );
}
