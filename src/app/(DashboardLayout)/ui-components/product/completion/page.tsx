"use client";

import { useContext } from "react";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import PageHeader from "@/components/layout/mui/PageHeader";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useListSwr } from "@/components/modules/product/completion/api";
import ProductCompletionForm from "@/components/modules/product/completion/form";
import ProductCompletionList from "@/components/modules/product/completion/list";

const pagePaths = [{ title: "Completion" }];

export default function ProductCompletionPage() {
  const theme = useTheme();
  const { mutate } = useListSwr();
  const { showModal, hideModal }: any = useContext(ModalContext);

  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new ProductCompletion",
      <ProductCompletionForm onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Product completion list" pagePaths={pagePaths} />
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
      <ProductCompletionList />
    </>
  );
}
