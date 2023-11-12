"use client";

import PageHeader from "@/components/layout/mui/PageHeader";
import TransactionLogList from "@/components/modules/transaction/log/list";

const pagePaths = [{ title: "Лог" }];

export default function TransactionLogPage() {
  return (
    <>
      <PageHeader pageTitle="Лог ийн жагсаалт" pagePaths={pagePaths} />
      <TransactionLogList />
    </>
  );
}
