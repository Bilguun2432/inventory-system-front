"use client";

import NumberPrefixList from "@/components/modules/number/prefix/list";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Төрөл" }];

export default function NumberPrefixPage() {
  return (
    <>
      <PageHeader pageTitle="Prefix жагсаалт" pagePaths={pagePaths} />
      <NumberPrefixList />
    </>
  );
}
