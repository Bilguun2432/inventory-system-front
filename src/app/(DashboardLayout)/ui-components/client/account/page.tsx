"use client";

import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { ClientAccountType } from "@/types/modules/client";
import { useListSwr } from "@/components/modules/client/kind/api";
import ClientAccountForm from "@/components/modules/client/account/form";
import ClientAccountList from "../../../../components/modules/client/account/list";
import CustomizedBreadcrumbs from "@/components/breadcrumbs/breadcrumb";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Данс" }];

export default function ClientAccountPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new ClientAccount",
      <ClientAccountForm onComplete={onMutateComplete} />,
    );
  }

  function onModalEdit(clientAccount: ClientAccountType) {
    showModal(
      `Edit ClientAccount /${clientAccount.accountNumber}/`,
      <ClientAccountForm id={clientAccount.id} onComplete={onMutateComplete} />,
    );
  }
  const styles = {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: theme.spacing(2),
  };
  return (
    <>
      <PageHeader
        pageTitle="Харилцагчын дансны жагсаалт"
        pagePaths={pagePaths}
      />
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Link
          href="/client/account/create"
          style={{ marginLeft: theme.spacing(1) }}
        >
          <Button variant="outlined" size="small">
            New
          </Button>
        </Link>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={createNewClick}
          sx={{ ml: theme.spacing(1) }}
        >
          New by Modal
        </Button>
      </Stack>
      <ClientAccountList onModalEdit={onModalEdit} />
    </>
  );
}
