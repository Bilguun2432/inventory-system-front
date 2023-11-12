"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import ClientKindForm from "@/components/modules/client/kind/form";

export default function ClientKindIdEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit ClientKind
      </Typography>
      <ClientKindForm
        id={editId}
        onComplete={() => {
          router.push("/client/kind");
        }}
      />
    </>
  );
}
