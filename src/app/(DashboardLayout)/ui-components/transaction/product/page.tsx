"use client";

import PageHeader from "@/components/layout/mui/PageHeader";
import TransactionProductList from "@/components/modules/transaction/product/list";

const pagePaths = [{ title: "Бүтээгдэхүүн" }];

export default function TransactionProductPage() {
  return (
    <>
      <PageHeader pageTitle="Бүтээгдэхүүний жагсаалт" pagePaths={pagePaths} />
      <TransactionProductList />
    </>
  );
}
