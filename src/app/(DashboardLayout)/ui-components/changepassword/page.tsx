"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChangePasswordForm from "@/components/modules/auth/changepassword/form";

export default function PasswordResetPage() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item md={4}>
        <Typography variant="h4" sx={{ my: "30px" }}>
          Change Password
        </Typography>
        <ChangePasswordForm />
      </Grid>
    </Grid>
  );
}
