"use client";

import { useState } from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";

import ProductDetail from "@/components/modules/product/detail";
import ProductDetailNav from "@/components/modules/product/detail-nav";
import { ProductType } from "@/types/modules/product";
import PageHeader from "@/components/layout/mui/PageHeader";
``;
const pagePaths = [{ title: "Бүтээгдэхүүн", url: "/product" }, { title: "Дэлгэрэнгүй" }];

export default function ProductDetailPage() {
  const theme = useTheme();
  const { id } = useParams();
  const productId = parseInt(typeof id == "string" ? id : "0");

  const [product, setProduct] = useState<ProductType | null>(null);

  const onProductLoadSuccess = (loadedProduct: ProductType) => {
    setProduct(loadedProduct);
  };

  return (
    <>
      <PageHeader pageTitle="Бүтээгдэхүүний дэлгэрэнгүй" pagePaths={pagePaths} />
      <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
        <Link href="/product" style={{ marginLeft: theme.spacing(1) }}>
          <Button variant="outlined" size="small">
            List
          </Button>
        </Link>
      </Stack>

      <ProductDetail id={productId} onProductLoadSuccess={onProductLoadSuccess} />

      {product && <ProductDetailNav product={product} />}
    </>
  );
}
