"use client";

import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { useListSwr } from "./api";
import dayjs from "dayjs";
import { BankAccountType } from "@/types/modules/bank_account";

interface ListProps {
  onModalEdit?: (productCategory: BankAccountType) => void;
}

export default function BankAccountList(props: ListProps) {
  const { onModalEdit } = props;
  // const { data, error, isLoading, mutate } = useListSwr();
  const { data } = useListSwr();

  function btnEditClick(entity: BankAccountType) {
    if (onModalEdit) {
      onModalEdit(entity);
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>clientId</TableCell>
              <TableCell>integrateKey</TableCell>
              <TableCell>accountNumber</TableCell>
              <TableCell>userCreatedId</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data.data &&
                data.data.map(function (bankaccount: any) {
                  return (
                    <TableRow key={`bankAccount_row_${bankaccount.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {bankaccount.id}
                      </TableCell>
                      <TableCell>{bankaccount.clientId}</TableCell>
                      <TableCell>{bankaccount.integrateKey}</TableCell>
                      <TableCell>{bankaccount.accountNumber}</TableCell>
                      <TableCell>{bankaccount.userCreatedId}</TableCell>
                      <TableCell>
                        {dayjs(bankaccount.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/bank/account/${bankaccount.id}/edit`}>
                          <Button variant="text" size="small" color="warning">
                            <EditIcon />
                          </Button>
                        </Link>
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
