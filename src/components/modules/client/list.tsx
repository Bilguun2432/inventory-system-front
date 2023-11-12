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
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useListSwr } from "./api";
import dayjs from "dayjs";
import { ClientType } from "@/types/modules/client";

interface ListProps {
  onModalEdit?: (productCategory: ClientType) => void;
}

export default function ClientList(props: ListProps) {
  // const { onModalEdit } = props;
  // const { data, error, isLoading, mutate } = useListSwr();
  const { data } = useListSwr();

  // function btnEditClick(entity: ClientType) {
  //   if (onModalEdit) {
  //     onModalEdit(entity);
  //   }
  // }
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>clientKind</TableCell>
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>userID</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;Detail</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data?.data?.map(function (client: any) {
                  return (
                    <TableRow key={`client_row_${client.id}` + "list"}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {client.id}
                      </TableCell>
                      <TableCell>{client.clientKind?.name}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.description}</TableCell>
                      <TableCell>{client.authUserId}</TableCell>
                      <TableCell>
                        {dayjs(client.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/client/${client.id}/detail`}>
                          <Button variant="outlined" size="small" color="info">
                            <ArrowCircleRightIcon />
                          </Button>
                        </Link>
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
