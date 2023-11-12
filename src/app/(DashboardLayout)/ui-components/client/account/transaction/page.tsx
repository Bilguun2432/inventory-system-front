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

import { ClientAccountTransactionType } from "@/types/modules/client";
import { useListSwr } from "@/components/modules/client/account/transaction/api";
import ClientAccountTransactionForm from "@/components/modules/client/account/transaction/form";
import ClientAccountTransactionList from "../../../../../components/modules/client/account/transaction/list";
import CustomizedBreadcrumbs from "@/components/breadcrumbs/breadcrumb";

export default function ClientAccountTransactionPageountPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new ClientAccountTransaction",
      <ClientAccountTransactionForm onComplete={onMutateComplete} />,
    );
  }

  function onModalEdit(clientAccountTransaction: ClientAccountTransactionType) {
    showModal(
      `Edit ClientAccountTransaction /${clientAccountTransaction.transactionCode}/`,
      <ClientAccountTransactionForm
        id={clientAccountTransaction.id}
        onComplete={onMutateComplete}
      />,
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
      <Box sx={styles}>
        <Typography variant="h4">ClientAccountTransaction List</Typography>
        <CustomizedBreadcrumbs />
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Link
          href="/client/account/transaction/create"
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
      <ClientAccountTransactionList onModalEdit={onModalEdit} />
    </>
  );
}
