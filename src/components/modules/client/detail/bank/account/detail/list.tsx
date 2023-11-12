"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import { useDetailBankAccountSwr } from "./api";
import dayjs from "dayjs";
import { BankAccountType } from "@/types/modules/bank_account";
import BankAccountForm from "@/components/modules/client/detail/bank/account/detail/form";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

interface ListProps {
  id: any;
}

export default function BankAccountList(props: ListProps) {
  const { id } = props;
  // const { data, error, isLoading, mutate } = useDetailBankAccountSwr(id);
  const { data, mutate } = useDetailBankAccountSwr(id);
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);

  function btnEditClick(entity: BankAccountType) {
    showModal(
      `Edit BankAccount /${entity.id}/`,
      <BankAccountForm
        clientId={id}
        id={entity.id}
        onComplete={onMutateComplete}
      />,
    );
  }
  function createNewClick2() {
    showModal(
      "Create new BankAccount",
      <BankAccountForm clientId={id} onComplete={onMutateComplete} />,
    );
  }

  async function onMutateComplete() {
    await mutate();
    hideModal();
  }

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={createNewClick2}
          sx={{ ml: theme.spacing(1) }}
        >
          New Bank Account
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>integrateKey</TableCell>
              <TableCell>accountNumber</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data.map(function (bankaccount: any) {
                  return (
                    <TableRow key={`bankAccount_row_${bankaccount.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {bankaccount.id}
                      </TableCell>
                      <TableCell>{bankaccount.integrateKey}</TableCell>
                      <TableCell>{bankaccount.accountNumber}</TableCell>
                      <TableCell>
                        {dayjs(bankaccount.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(bankaccount);
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

/*
<table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">clientKindId</th>
            <th className="border border-slate-300">name</th>
            <th className="border border-slate-300">description</th>
            <th className="border border-slate-300">userCreatedId</th>
            <th className="border border-slate-300">timeCreated</th>
          </tr>
        </thead>

        {typeof data === "object" && (
          <tbody>
            {data.data &&
              data.data.map(function (productCategory: any) {
                return (
                  <tr key={`product_category_row_${productCategory.id}`}>
                    <td className="p-1 border border-slate-300 text-center font-bold">
                      {productCategory.id}
                    </td>
                    <td className="p-1 border border-slate-300 text-center font-bold">
                      {productCategory.clientKindId}
                    </td>
                    <td className="p-1 border border-slate-300 text-center font-bold">
                      {productCategory.name}
                    </td>
                    <td className="p-1 border border-slate-300 text-center font-bold">
                      {productCategory.description}
                    </td>
                    <td className="p-1 border border-slate-300 text-center font-bold">
                      {productCategory.userCreatedId}
                    </td>
                    <td className="p-1 border border-slate-300 text-center font-bold">
                      {productCategory.timeCreated}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
*/
