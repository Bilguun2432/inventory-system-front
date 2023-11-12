"use client";

import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import AuthPermissionForm from "@/components/modules/auth/permission/form";

export default function AuthPermissionPage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New AuthPermission
      </Typography>
      <AuthPermissionForm
        onComplete={() => {
          router.push("/auth/permission");
        }}
      />
    </>
  );
}
