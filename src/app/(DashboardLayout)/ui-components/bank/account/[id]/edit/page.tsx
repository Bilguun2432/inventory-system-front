"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import BankAccountForm from "@/components/modules/bank/account/form";

export default function BankAccountIdEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit BankAccount
      </Typography>
      <BankAccountForm
        id={editId}
        onComplete={() => {
          router.push("/bank/account");
        }}
      />
    </>
  );
}
