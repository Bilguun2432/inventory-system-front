"use client";

import Link from "next/link";
import React from "react";
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ProductList from "@/components/modules/product/category/detail/list";
import { useDetailSwr } from "@/components/modules/product/category/detail/api";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Ангилал", url: "/product/category" }, { title: "Дэлгэрэнгүй" }];

export default function ProductCategoryDetail() {
  const theme = useTheme();
  const { id } = useParams();
  const { data, mutate } = useDetailSwr(id);
  const { showModal, hideModal }: any = useContext(ModalContext);

  async function onMutateComplete() {
    await mutate();
    hideModal();
  }

  return (
    <>
      <PageHeader pageTitle={`Ангилалын дэлгэрэнгүй/${data?.name}/`} pagePaths={pagePaths} />
      <Stack direction="row" sx={{ mb: theme.spacing(2) }}>
        <Link href={`/product/category`}>
          <Button variant="outlined" size="small" color="primary">
            <ArrowCircleLeftIcon />
          </Button>
        </Link>
      </Stack>
      <ProductList id={id} onComplete={onMutateComplete} />
    </>
  );
}
