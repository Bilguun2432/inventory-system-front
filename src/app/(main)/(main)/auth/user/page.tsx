"use client";

import AuthUserList from "@/components/modules/auth/user/list";

import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Хэрэглэгч" }];

export default function AuthUserPage() {
  return (
    <>
      <PageHeader pageTitle="AuthUser List" pagePaths={pagePaths} />
      <AuthUserList />
    </>
  );
}
