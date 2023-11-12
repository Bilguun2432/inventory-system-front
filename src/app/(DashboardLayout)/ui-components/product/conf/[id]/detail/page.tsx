"use client";

import Link from "next/link";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";

import ProductConfDetail from "@/components/modules/product/conf/detail";
import { ProductConfType } from "@/types/modules/product";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Config", url: "/product/conf" }, { title: "Дэлгэрэнгүй" }];

export default function ConfDetailPage() {
  const theme = useTheme();
  const { id } = useParams();
  const productConfId = parseInt(typeof id == "string" ? id : "0");

  const [productConf, setProductConf] = useState<ProductConfType | null>(null);

  const onProductLoadSuccess = (loadedProduct: ProductConfType) => {
    setProductConf(loadedProduct);
  };

  return (
    <>
      <PageHeader pageTitle="Config detail" pagePaths={pagePaths} />
      <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
        <Link href="/product/conf" style={{ marginLeft: theme.spacing(1) }}>
          <Button variant="outlined" size="small">
            List
          </Button>
        </Link>
      </Stack>

      <ProductConfDetail id={productConfId} onProductLoadSuccess={onProductLoadSuccess} />
    </>
  );
}
