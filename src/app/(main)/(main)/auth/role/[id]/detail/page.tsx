"use client";

import Link from "next/link";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";

import { AuthRoleType } from "@/types/modules/auth_role";
import PageHeader from "@/components/layout/mui/PageHeader";
import AuthRoleDetail from "@/components/modules/auth/role/detail";
import AuthPermissionDetailNav from "@/components/modules/auth/role/detail-nav";

const pagePaths = [{ title: "Үүрэг", url: "/auth/role" }, { title: "Дэлгэрэнгүй" }];

export default function AuthRoleDetailPage() {
  const theme = useTheme();
  const { id } = useParams();
  const authRoleId = parseInt(typeof id == "string" ? id : "0");

  const [authRole, setAuthRole] = useState<AuthRoleType | null>(null);

  const onProductLoadSuccess = (loadedProduct: AuthRoleType) => {
    setAuthRole(loadedProduct);
  };

  return (
    <>
      <PageHeader pageTitle="AuthRole Detail" pagePaths={pagePaths} />
      <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
        <Link href="/auth/role" style={{ marginLeft: theme.spacing(1) }}>
          <Button variant="outlined" size="small">
            List
          </Button>
        </Link>
      </Stack>

      <AuthRoleDetail id={authRoleId} onProductLoadSuccess={onProductLoadSuccess} />
      {authRole && <AuthPermissionDetailNav authRole={authRole} />}
    </>
  );
}
