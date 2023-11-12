"use client";

import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";

import RoleListForm from "@/components/modules/auth/user/role/form";

export default function AuthUserRoleDetail() {
  const { id } = useParams();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit AuthUser role
      </Typography>
      <RoleListForm id={parseInt(typeof id == "string" ? id : "0")} />
    </>
  );
}
