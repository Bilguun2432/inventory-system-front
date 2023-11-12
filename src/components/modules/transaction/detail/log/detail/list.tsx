"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useListSwr } from "./api";
import dayjs from "dayjs";

interface ListProps {
  id: any;
}

export default function TransactionInvoiceList(props: ListProps) {
  const { id } = props;
  const { data } = useListSwr(id);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>TransactionId</TableCell>
              <TableCell>transactionInvoiceId</TableCell>
              <TableCell>transactionProductId</TableCell>
              <TableCell>logLevel</TableCell>
              <TableCell>logType</TableCell>
              <TableCell>message</TableCell>
              <TableCell>timeCreated</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data?.map(function (transactionLog: any) {
                  return (
                    <TableRow key={`transaction_log_row_${transactionLog.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {transactionLog.id}
                      </TableCell>
                      <TableCell>{transactionLog.transactionId}</TableCell>
                      <TableCell>
                        {transactionLog.transactionInvoiceId}
                      </TableCell>
                      <TableCell>
                        {transactionLog.transactionProductId}
                      </TableCell>
                      <TableCell>{transactionLog.logLevel}</TableCell>
                      <TableCell>{transactionLog.logType}</TableCell>
                      <TableCell>{transactionLog.message}</TableCell>
                      <TableCell>
                        {dayjs(transactionLog.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
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
