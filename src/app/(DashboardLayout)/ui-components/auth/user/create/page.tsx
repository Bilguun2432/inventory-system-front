"use client";

import AuthUserForm from "@/components/modules/auth/user/form";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

export default function AuthUserPage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New AuthUser
      </Typography>
      <AuthUserForm
        onComplete={() => {
          router.push("/auth/user");
        }}
      />
    </>
  );
}
