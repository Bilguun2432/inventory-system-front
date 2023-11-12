"use client";

import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import { useListSwr } from "@/components/modules/number/kind/api";
import NumberKindList from "@/components/modules/number/kind/list";
import NumberKindForm from "@/components/modules/number/kind/form";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Төрөл" }];

export default function NumberKindPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new NumberKind",
      <NumberKindForm onComplete={onMutateComplete} />,
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
          color="primary"
          onClick={createNewClick}
          sx={{ ml: theme.spacing(1) }}
        >
          New
        </Button>
      </Stack>
      <NumberKindList />
    </>
  );
}
