"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import BankAccountForm from "@/components/modules/bank/account/form";

export default function BankAccountCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New BankAccount
      </Typography>
      <BankAccountForm
        onComplete={() => {
          router.push("/bank/account");
        }}
      />
    </>
  );
}
