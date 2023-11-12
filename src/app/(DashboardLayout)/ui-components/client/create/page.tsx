"use client";

import ClientForm from "@/components/modules/client/form";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import React from "react";

const CreateClient = () => {
  const router = useRouter();

  return (
    <>
      <Typography variant="h5" component="h2">
        Create New Client
      </Typography>
      <ClientForm
        onComplete={() => {
          router.push("/client");
        }}
      />
    </>
  );
};

export default CreateClient;
