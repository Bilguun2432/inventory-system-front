"use client";

import PageHeader from "@/components/layout/mui/PageHeader";
import AuthPermissionList from "@/components/modules/auth/permission/list";

const pagePaths = [{ title: "Зөвшөөрөл" }];

export default function AuthPermissionPage() {
  return (
    <>
      <PageHeader pageTitle="AuthPermission List" pagePaths={pagePaths} />
      <AuthPermissionList />
    </>
  );
}
