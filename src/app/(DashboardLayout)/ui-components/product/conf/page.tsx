"use client";

import ProductConfList from "@/components/modules/product/conf/list";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "config" }];

export default function ProductConfPage() {
  return (
    <>
      <PageHeader pageTitle="Config list" pagePaths={pagePaths} />
      <ProductConfList />
    </>
  );
}
