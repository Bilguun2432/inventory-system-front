"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import ClientAccountTransactionForm from "@/components/modules/client/account/transaction/form";

export default function ClientAccountIdEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit ClientAccountTransaction
      </Typography>
      <ClientAccountTransactionForm
        id={editId}
        onComplete={() => {
          router.push("/client/account/transaction");
        }}
      />
    </>
  );
}
