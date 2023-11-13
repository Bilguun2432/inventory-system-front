"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import AuthRoleForm from "@/components/modules/auth/role/form";

export default function AuthRoleEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit AuthRole
      </Typography>
      <AuthRoleForm
        id={editId}
        onComplete={() => {
          router.push("/auth/role");
        }}
      />
    </>
  );
}
