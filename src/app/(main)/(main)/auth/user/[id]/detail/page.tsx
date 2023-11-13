"use client";

import Link from "next/link";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";

import { AuthUserType } from "@/types/modules/auth_user";
import PageHeader from "@/components/layout/mui/PageHeader";
import AuthUserDetail from "@/components/modules/auth/user/detail";
import AuthUserDetailNav from "@/components/modules/auth/user/detail-nav";

const pagePaths = [{ url: "/auth/user", title: "Хэрэглэгч" }, { title: "Дэлгэрэнгүй" }];

export default function AuthUserDetailPage() {
  const theme = useTheme();
  const { id } = useParams();
  const authUserId = parseInt(typeof id == "string" ? id : "0");
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);

  const onProductLoadSuccess = (loadedProduct: AuthUserType) => {
    setAuthUser(loadedProduct);
  };

  return (
    <>
      <PageHeader pageTitle="Хэрэглэгчийн дэлгэрэнгүй" pagePaths={pagePaths} />
      <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
        <Link href="/auth/user" style={{ marginLeft: theme.spacing(1) }}>
          <Button variant="outlined" size="small">
            List
          </Button>
        </Link>
      </Stack>

      <AuthUserDetail id={authUserId} onProductLoadSuccess={onProductLoadSuccess} />

      {authUser && <AuthUserDetailNav authUser={authUser} />}
    </>
  );
}
