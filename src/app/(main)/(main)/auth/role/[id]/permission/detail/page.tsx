"use client";

import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";

import PermisionListForm from "@/components/modules/auth/role/permission/form";

export default function RolePermissionListDetail() {
  const { id } = useParams();

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit AuthRole permissions
      </Typography>
      <PermisionListForm id={parseInt(typeof id == "string" ? id : "0")} />
    </>
  );
}
