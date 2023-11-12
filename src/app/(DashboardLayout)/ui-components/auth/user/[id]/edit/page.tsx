"use client";

import AuthUserForm from "@/components/modules/auth/user/form";
import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

export default function AuthUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        dsa ProductCategory
      </Typography>
      <AuthUserForm
        id={editId}
        onComplete={() => {
          router.push("/auth/user");
        }}
      />
    </>
  );
}
