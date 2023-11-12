"use client";

import Stack from "@mui/material/Stack";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import CreateContractForm from "@/components/modules/contract/create/form";
import ContractList from "@/components/modules/contract/create/list";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "contract" }];

export default function CreateContract() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const [htmlData, setHtmlData] = React.useState<any>();

  function createContractClick() {
    showModal(
      "Create new Contract",
      <CreateContractForm
        showModal={showModal}
        hideModal={hideModal}
        setHtmlData={setHtmlData}
      />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Contract list" pagePaths={pagePaths} />
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={createContractClick}
        >
          Create contract
        </Button>
      </Stack>
      <ContractList data={htmlData?.html} />
    </>
  );
}
