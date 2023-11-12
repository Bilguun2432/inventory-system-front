"use client";

import PasswordResetForm from "@/components/modules/auth/passwordreset/form";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function PasswordResetPage() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item md={4}>
        <Typography variant="h4" sx={{ my: "30px" }}>
          Reset Password
        </Typography>
        <PasswordResetForm />
      </Grid>
    </Grid>
  );
}
