"use client";

import TransactionList from "@/components/modules/transaction/list";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Гүйлгээ" }];

export default function TransactionPage() {
  return (
    <>
      <PageHeader pageTitle="Гүйлгээний жагсаалт" pagePaths={pagePaths} />
      <TransactionList />
    </>
  );
}
