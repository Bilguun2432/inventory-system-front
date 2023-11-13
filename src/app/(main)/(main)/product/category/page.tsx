"use client";

import ProductCategoryList from "@/components/modules/product/category/list";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Ангилал" }];

export default function ProductConfPage() {
  return (
    <>
      <PageHeader pageTitle="Ангилалын жагсаалт" pagePaths={pagePaths} />
      <ProductCategoryList />
    </>
  );
}
