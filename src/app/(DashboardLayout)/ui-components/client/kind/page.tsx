"use client";

import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import { ClientKindType } from "@/types/modules/client";
import { useListSwr } from "@/components/modules/client/kind/api";
import ClientKindList from "@/components/modules/client/kind/list";
import ClientKindForm from "@/components/modules/client/kind/form";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Төрөл" }];

export default function ClientKindPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new ClientKind",
      <ClientKindForm onComplete={onMutateComplete} />,
    );
  }

  function onModalEdit(clientKind: ClientKindType) {
    showModal(
      `Edit ClientKind /${clientKind.name}/`,
      <ClientKindForm id={clientKind.id} onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Төрөлийн жагсаалт" pagePaths={pagePaths} />
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
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
      <ClientKindList onModalEdit={onModalEdit} />
    </>
  );
}
