"use client";

import Link from "next/link";
import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import { BankAccountType } from "@/types/modules/bank_account";
import { useListSwr } from "@/components/modules/client/kind/api";
import BankAccountList from "@/components/modules/bank/account/list";
import BankAccountForm from "@/components/modules/bank/account/form";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Данс" }];

export default function BankAccountPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new BankAccount",
      <BankAccountForm onComplete={onMutateComplete} />,
    );
  }

  function onModalEdit(bankAccountType: BankAccountType) {
    showModal(
      `Edit BankAccount /${bankAccountType.id}/`,
      <BankAccountForm id={bankAccountType.id} onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Дансны жагсаалт" pagePaths={pagePaths} />
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Link
          href="/client/kind/create"
          style={{ marginLeft: theme.spacing(1) }}
        >
          <Button variant="outlined" size="small">
            New
          </Button>
        </Link>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={createNewClick}
          sx={{ ml: theme.spacing(1) }}
        >
          New by Modal
        </Button>
      </Stack>
      <BankAccountList onModalEdit={onModalEdit} />
    </>
  );
}
