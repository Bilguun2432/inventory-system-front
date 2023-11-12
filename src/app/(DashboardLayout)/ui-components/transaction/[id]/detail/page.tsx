"use client";

import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { useState, SyntheticEvent } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useParams } from "next/navigation";
import PageHeader from "@/components/layout/mui/PageHeader";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import TransactionDetail from "@/components/modules/transaction/detail";
import BillingList from "@/components/modules/transaction/detail/billing/detail/list";
import TransactionLogList from "@/components/modules/transaction/detail/log/detail/list";
import TransactionInvoiceList from "@/components/modules/transaction/invoice/transaction-list";
import TransactionProductList from "@/components/modules/transaction/product/transaction-list";
import { TransactionType } from "@/types/modules/transaction";
import { CrumbProps } from "@/components/layout/mui/Breadcrumb";

const defaultPagePaths = [{ title: "Гүйлгээ", url: "/transaction" }, { title: "Дэлгэрэнгүй" }];

export default function TransactionDetailPage() {
  const theme = useTheme();
  const params = useParams();
  const id: number = typeof params.id == "string" ? parseInt(params.id) : 0;

  const [pagePaths, setPagePaths] = useState<CrumbProps[]>(defaultPagePaths);
  const [transaction, setTransaction] = useState<TransactionType | null>(null);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  function onLoadSuccess(t: TransactionType) {
    if (!t) {
      return;
    }
    setTransaction(t);
    const newPagePaths = [...pagePaths];
    const lastCrumb = newPagePaths.pop();
    if (lastCrumb) {
      lastCrumb.title = t.transactionCode;
      newPagePaths.push(lastCrumb);
      setPagePaths(pagePaths);
    }
  }

  return (
    <>
      <PageHeader pageTitle="Гүйлгээний дэлгэрэнгүй" pagePaths={pagePaths} />
      <Stack direction="row" sx={{ mb: theme.spacing(2) }}>
        <Link href={`/transaction`}>
          <Button variant="outlined" size="small" color="info">
            <ArrowCircleLeftIcon />
          </Button>
        </Link>
      </Stack>

      <Box sx={{ mb: 4 }}>
        <TransactionDetail id={id} onLoadSuccess={onLoadSuccess} />
      </Box>

      {transaction && (
        <>
          <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" style={{ paddingBottom: "10px" }}>
            <Tab label="Бүтээгдэхүүн" />
            <Tab label="Нэхэмжлэх" />
            <Tab label="Билл" />
            <Tab label="Лог" />
          </Tabs>
          {selectedTab === 0 && <TransactionProductList transaction={transaction} />}
          {selectedTab === 1 && <TransactionInvoiceList transaction={transaction} />}
          {selectedTab === 2 && <BillingList id={id} />}
          {selectedTab === 3 && <TransactionLogList id={id} />}
        </>
      )}
    </>
  );
}
