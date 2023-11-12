import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDetailSwr } from "./api";
import dayjs from "dayjs";

interface ListProps {
  id: any;
}

export default function TransactionInvoiceList(props: ListProps) {
  const { id } = props;
  const { data } = useDetailSwr(id);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>billType</TableCell>
              <TableCell>email</TableCell>
              <TableCell>organizationCode</TableCell>
              <TableCell>organizationName</TableCell>
              <TableCell>state</TableCell>
              <TableCell>transactionId</TableCell>
              <TableCell>timeCreated</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              <TableRow key={`transaction_bill_row_${data.id}`}>
                <TableCell className="p-1 border border-slate-300 text-center font-bold">{data.id}</TableCell>
                <TableCell>{data.billType}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.organizationCode}</TableCell>
                <TableCell>{data.organizationName}</TableCell>
                <TableCell>{data.state}</TableCell>
                <TableCell>{data.transactionId}</TableCell>
                <TableCell>{dayjs(data.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
