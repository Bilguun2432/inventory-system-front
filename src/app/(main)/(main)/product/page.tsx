"use client";

import React, { useContext } from "react";
import ProductList from "@/components/modules/product/list";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Бүтээгдэхүүн" }];

export default function ProductPage() {
  return (
    <>
      <PageHeader pageTitle="Бүтээгдэхүүний жагсаалт" pagePaths={pagePaths} />
      <ProductList />
    </>
  );
}
