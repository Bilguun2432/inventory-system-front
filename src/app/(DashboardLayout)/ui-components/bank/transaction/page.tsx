"use client";
import CustomizedBreadcrumbs from "@/components/breadcrumbs/breadcrumb";
import PageHeader from "@/components/layout/mui/PageHeader";
import BankAccountTransactionList from "@/components/modules/bank/transaction/list";

const pagePaths = [{ title: "Хуулга" }];

export default function BankAccoutPage() {
  return (
    <>
      <PageHeader
        pageTitle="Дансны хуулгануудын жагсаалт"
        pagePaths={pagePaths}
      />
      <CustomizedBreadcrumbs />
      <BankAccountTransactionList />
    </>
  );
}
