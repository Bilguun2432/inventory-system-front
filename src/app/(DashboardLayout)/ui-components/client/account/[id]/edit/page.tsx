"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import ClientAccountForm from "@/components/modules/client/account/form";

export default function ClientAccountIdEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit ClientAccount
      </Typography>
      <ClientAccountForm
        id={editId}
        onComplete={() => {
          router.push("/client/account");
        }}
      />
    </>
  );
}
