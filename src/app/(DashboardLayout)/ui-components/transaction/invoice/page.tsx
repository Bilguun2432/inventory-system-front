"use client";

import PageHeader from "@/components/layout/mui/PageHeader";
import TransactionInvoiceList from "@/components/modules/transaction/invoice/list";

const pagePaths = [{ title: "Нэхэмжлэл" }];

export default function TransactionInvoicePage() {
  return (
    <>
      <PageHeader pageTitle="Нэхэмжлэлийн жагсаалт" pagePaths={pagePaths} />
      <TransactionInvoiceList />
    </>
  );
}
