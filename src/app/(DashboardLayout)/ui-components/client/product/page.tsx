"use client";

import Link from "next/link";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { ClientProductType } from "@/types/modules/client";
import { useListSwr } from "@/components/modules/client/product/api";
import ClientProductList from "@/components/modules/client/product/list";
import ClientProductForm from "@/components/modules/client/product/form";
import CustomizedBreadcrumbs from "@/components/breadcrumbs/breadcrumb";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Бүтээгдэхүүн" }];

export default function ClientProductPage() {
  const theme = useTheme();
  const { mutate } = useListSwr();
  const { showModal, hideModal }: any = useContext(ModalContext);

  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new ClientProduct",
      <ClientProductForm onComplete={onMutateComplete} />,
    );
  }

  function onModalEdit(clientProductType: ClientProductType) {
    showModal(
      `Edit ClientProduct /${clientProductType.id}/`,
      <ClientProductForm
        id={clientProductType.id}
        onComplete={onMutateComplete}
      />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Бүтээгдэхүүний жагсаалт" pagePaths={pagePaths} />
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Link
          href="/client/product/create"
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
      <ClientProductList onModalEdit={onModalEdit} />
    </>
  );
}
