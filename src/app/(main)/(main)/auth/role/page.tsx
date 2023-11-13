"use client";

import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

import { AuthRoleType } from "@/types/modules/auth_role";
import PageHeader from "@/components/layout/mui/PageHeader";
import AuthRoleList from "@/components/modules/auth/role/list";
import AuthRoleForm from "@/components/modules/auth/role/form";
import { useListSwr } from "@/components/modules/auth/role/api";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

const pagePaths = [{ title: "Үүрэг" }];

export default function AuthRolePermisionPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal("Create new AuthRole", <AuthRoleForm onComplete={onMutateComplete} />);
  }

  function onModalEdit(clientProductType: AuthRoleType) {
    showModal(`Edit AuthRole /${clientProductType.name}/`, <AuthRoleForm id={clientProductType.id} onComplete={onMutateComplete} />);
  }

  return (
    <>
      <PageHeader pageTitle="AuthRole List" pagePaths={pagePaths} />
      <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
        <Button variant="outlined" size="small" color="secondary" onClick={createNewClick} sx={{ ml: theme.spacing(1) }}>
          New
        </Button>
      </Stack>
      <AuthRoleList onModalEdit={onModalEdit} />
    </>
  );
}
