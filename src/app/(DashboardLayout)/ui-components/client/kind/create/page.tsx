"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import ClientKindForm from "@/components/modules/client/kind/form";

export default function ClientKindCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New Client Kind
      </Typography>
      <ClientKindForm
        onComplete={() => {
          router.push("/client/kind");
        }}
      />
    </>
  );
}
