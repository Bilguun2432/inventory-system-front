"use client";

import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import { useListSwr } from "@/components/modules/client/api";
import ClientList from "@/components/modules/client/list";
import ClientForm from "@/components/modules/client/form";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Харилцагч" }];

export default function ClientProductPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);

  const { mutate } = useListSwr();

  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new Client",
      <ClientForm onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Харилцагчын жагсаалт" pagePaths={pagePaths} />
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={createNewClick}
          sx={{ ml: theme.spacing(1) }}
        >
          New
        </Button>
      </Stack>
      <ClientList />
    </>
  );
}
