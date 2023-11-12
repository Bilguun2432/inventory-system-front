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
import { ClientAccountType } from "@/types/modules/client";

interface ListProps {
  onModalEdit?: (clientAccount: ClientAccountType) => void;
}

export default function ClientKindList(props: ListProps) {
  const { onModalEdit } = props;
  // const { data, error, isLoading, mutate } = useListSwr();
  const { data } = useListSwr();

  function btnEditClick(entity: ClientAccountType) {
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
              <TableCell>accountNumber</TableCell>
              <TableCell>userCreatedId</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data?.data?.map(function (clientAccount: any) {
                  return (
                    <TableRow key={`clientAccount_row_${clientAccount.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {clientAccount.id}
                      </TableCell>
                      <TableCell>{clientAccount.accountNumber}</TableCell>
                      <TableCell>{clientAccount.userCreatedId}</TableCell>
                      <TableCell>
                        {dayjs(clientAccount.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/client/account/${clientAccount.id}/edit`}>
                          <Button variant="text" size="small" color="warning">
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(clientAccount);
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
