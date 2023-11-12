"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import ClientProductForm from "@/components/modules/client/product/form";

export default function ClientProductIdEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit ClientProduct
      </Typography>
      <ClientProductForm
        id={editId}
        onComplete={() => {
          router.push("/client");
        }}
      />
    </>
  );
}
