"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import AuthRoleForm from "@/components/modules/auth/role/form";

export default function AuthRolePermisionCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New AuthRole
      </Typography>
      <AuthRoleForm
        onComplete={() => {
          router.push("/auth/role");
        }}
      />
    </>
  );
}
