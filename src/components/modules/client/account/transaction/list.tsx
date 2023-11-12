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
import dayjs from "dayjs";

import { useListSwr } from "./api";
import { ClientAccountTransactionType } from "@/types/modules/client";

interface ListProps {
  onModalEdit?: (
    clientAccountTransaction: ClientAccountTransactionType,
  ) => void;
}

export default function ClientAccountTransactionList(props: ListProps) {
  const { onModalEdit } = props;
  // const { data, error, isLoading, mutate } = useListSwr();
  const { data } = useListSwr();

  function btnEditClick(entity: ClientAccountTransactionType) {
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
              <TableCell>clientAccountId</TableCell>
              <TableCell>transactionId</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>balanceAfter</TableCell>
              <TableCell>timeCreated</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data.data.map(function (clientAccountTransaction: any) {
                  return (
                    <TableRow
                      key={`clientAccountTransaction_row_${clientAccountTransaction.id}`}
                    >
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {clientAccountTransaction.id}
                      </TableCell>
                      <TableCell>
                        {clientAccountTransaction.clientAccountId}
                      </TableCell>
                      <TableCell>
                        {clientAccountTransaction.transactionId}
                      </TableCell>
                      <TableCell>{clientAccountTransaction.amount}</TableCell>
                      <TableCell>
                        {clientAccountTransaction.balanceAfter}
                      </TableCell>
                      <TableCell>
                        {dayjs(clientAccountTransaction.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/client/account/transaction/${clientAccountTransaction.id}/edit`}
                        >
                          <Button variant="text" size="small" color="warning">
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(clientAccountTransaction);
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
