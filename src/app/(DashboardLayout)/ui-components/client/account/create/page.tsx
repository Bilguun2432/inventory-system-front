"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import ClientAccountForm from "@/components/modules/client/account/form";

export default function ClientAccountCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New Client Account
      </Typography>
      <ClientAccountForm
        onComplete={() => {
          router.push("/client/account");
        }}
      />
    </>
  );
}
