"use client";

import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useParams } from "next/navigation";
import PageHeader from "@/components/layout/mui/PageHeader";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ClientList from "@/components/modules/client/detail/detail/list";
import ClientAccountList from "@/components/modules/client/detail/account/detail/list";
import ClientProductList from "@/components/modules/client/detail/product/detail/list";
import BankAccountList from "@/components/modules/client/detail/bank/account/detail/list";

const pagePaths = [
  { title: "Харилцагч", url: "/client" },
  { title: "Дэлгэрэнгүй" },
];

export default function ClientProductPage() {
  const theme = useTheme();
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <PageHeader pageTitle="Харилцагчийн дэлгэрэнгүй" pagePaths={pagePaths} />
      <Stack direction="row" sx={{ mb: theme.spacing(2) }}>
        <Link href={`/client`}>
          <Button variant="outlined" size="small" color="info">
            <ArrowCircleLeftIcon />
          </Button>
        </Link>
      </Stack>
      <ClientList id={id} />
      <br></br>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        style={{ paddingBottom: "10px" }}
      >
        <Tab label="Client Product List" />
        <Tab label="Client Account List" />
        <Tab label="Bank Account List" />
      </Tabs>
      {selectedTab === 0 && <ClientProductList id={id} />}
      {selectedTab === 1 && <ClientAccountList id={id} />}
      {selectedTab !== 0 && selectedTab !== 1 && <BankAccountList id={id} />}
    </>
  );
}
