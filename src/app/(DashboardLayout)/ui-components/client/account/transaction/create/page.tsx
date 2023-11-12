"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import ClientAccountTransactionForm from "@/components/modules/client/account/transaction/form";

export default function ClientAccountTransactionCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New Client Account Transaction
      </Typography>
      <ClientAccountTransactionForm
        onComplete={() => {
          router.push("/client/account/transaction");
        }}
      />
    </>
  );
}
