"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import ClientProductForm from "@/components/modules/client/product/form";

export default function ClientProductCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New Client Product
      </Typography>
      <ClientProductForm
        onComplete={() => {
          router.push("/client/product");
        }}
      />
    </>
  );
}
