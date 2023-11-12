"use client";

import ProductNumberCheckList from "@/components/modules/product/number/check/list";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Дугаар шалгалт" }];

export default function ProductNumberCheckPage() {
  return (
    <>
      <PageHeader pageTitle="Дугаар шалгалтын жагсаалт" pagePaths={pagePaths} />
      <ProductNumberCheckList />
    </>
  );
}
