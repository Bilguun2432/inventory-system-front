"use client";

import Link from "next/link";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

import { useParams } from "next/navigation";
import PageHeader from "@/components/layout/mui/PageHeader";
import { ProductCompletionType } from "@/types/modules/product";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ProductCompletionDetail from "@/components/modules/product/completion/detail";
import ProductCompletionStepList from "@/components/modules/product/completion/step/list";

const pagePaths = [
  { title: "completion", url: "/product/completion" },
  { title: "Дэлгэрэнгүй" },
];

export default function ClientProductPage() {
  const theme = useTheme();
  const { id } = useParams();
  const productCompletionId = parseInt(typeof id == "string" ? id : "0");

  const [productCompletion, setProductCompletion] =
    useState<ProductCompletionType | null>(null);

  function onProductCompletionLoad(pc: ProductCompletionType) {
    setProductCompletion(pc);
  }

  return (
    <>
      <PageHeader pageTitle="Product Completion Detail" pagePaths={pagePaths} />
      <Stack direction="row" sx={{ mb: theme.spacing(2) }}>
        <Link href={`/product/completion`}>
          <Button variant="outlined" size="small" color="info">
            <ArrowCircleLeftIcon />
          </Button>
        </Link>
      </Stack>
      <ProductCompletionDetail
        id={productCompletionId}
        onLoadSuccess={onProductCompletionLoad}
      />

      {productCompletion && (
        <ProductCompletionStepList productCompletion={productCompletion} />
      )}
    </>
  );
}
