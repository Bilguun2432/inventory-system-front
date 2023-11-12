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
import { ClientProductType } from "@/types/modules/client";

interface ListProps {
  onModalEdit?: (clientProductType: ClientProductType) => void;
}

export default function ClientKindList(props: ListProps) {
  const { onModalEdit } = props;
  const { data } = useListSwr();

  function btnEditClick(entity: ClientProductType) {
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
              <TableCell>productId</TableCell>
              <TableCell>useCustomPrice</TableCell>
              <TableCell>price</TableCell>
              <TableCell>userCreatedId</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data.data &&
                data.data.map(function (clientProduct: any) {
                  return (
                    <TableRow key={`clientProduct_row_${clientProduct.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {clientProduct.id}
                      </TableCell>
                      <TableCell>{clientProduct.clientId}</TableCell>
                      <TableCell>{clientProduct.productId}</TableCell>
                      <TableCell>
                        {clientProduct.useCustomPrice ? "true" : "false"}
                      </TableCell>
                      {/* <TableCell>{clientProduct.useCustomPrice}</TableCell> */}
                      <TableCell>{clientProduct.price}</TableCell>
                      <TableCell>{clientProduct.userCreatedId}</TableCell>
                      <TableCell>
                        {dayjs(clientProduct.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/client/product/${clientProduct.id}/edit`}>
                          <Button variant="text" size="small" color="warning">
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(clientProduct);
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
