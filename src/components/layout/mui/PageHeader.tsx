"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumb, { CrumbProps } from "./Breadcrumb";
import React from "react";

export default function PageHeader({ pageTitle, pagePaths }: { pageTitle: string; pagePaths: CrumbProps[] }) {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item md={6}>
        <Typography variant="h4" component="h4" sx={{ my: 0 }}>
          {pageTitle}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Breadcrumb paths={pagePaths} />
        </Stack>
      </Grid>
    </Grid>
  );
}
