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
import dayjs from "dayjs";

import { useListSwr } from "./api";
import { ClientKindType } from "@/types/modules/client";

interface ListProps {
  onModalEdit?: (productCategory: ClientKindType) => void;
}

export default function ClientKindList(props: ListProps) {
  const { onModalEdit } = props;
  // const { data, error, isLoading, mutate } = useListSwr();
  const { data } = useListSwr();

  function btnEditClick(entity: ClientKindType) {
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
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>userCreatedId</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data.map(function (clientKind: any) {
                  return (
                    <TableRow key={`clientKind_row_${clientKind.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {clientKind.id}
                      </TableCell>
                      <TableCell>{clientKind.name}</TableCell>
                      <TableCell>{clientKind.description}</TableCell>
                      <TableCell>{clientKind.userCreatedId}</TableCell>
                      <TableCell>
                        {dayjs(clientKind.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(clientKind);
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
