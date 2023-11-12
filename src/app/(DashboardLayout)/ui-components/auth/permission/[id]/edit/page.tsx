"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";
import AuthPermissionForm from "@/components/modules/auth/permission/form";

export default function AuthPermissionPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit AuthPermission
      </Typography>
      <AuthPermissionForm
        id={editId}
        onComplete={() => {
          router.push("/auth/permission");
        }}
      />
    </>
  );
}
