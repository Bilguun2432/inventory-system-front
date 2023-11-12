"use client";

import NewPasswordForm from "@/components/modules/auth/newpassword/form";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";

export default function NewPasswordPage() {
  const { token } = useParams();
  const editToken = typeof token == "string" ? token : "";
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item md={4}>
        <Typography variant="h4" sx={{ my: "30px" }}>
          New password
        </Typography>
        <NewPasswordForm token={editToken} />
      </Grid>
    </Grid>
  );
}
