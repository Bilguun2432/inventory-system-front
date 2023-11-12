"use client";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { PaymentCheckResultType } from "@/types/modules/payment";
import PaymentState from "@/components/modules/transaction/PaymentState";
import { NameValueType } from "@/types/modules/common";

export default function PaymentCheckResult(props: PaymentCheckResultType) {
  const { state, message, triggerProcess, invoiceId, extraInfo } = props;

  return (
    <>
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <PaymentState state={state} />
      </Stack>

      <Typography variant={"body2"}>{message}</Typography>

      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow hover>
              <TableCell>Нэхэмжлэх</TableCell>
              <TableCell>{invoiceId}</TableCell>
            </TableRow>
            {extraInfo.map(function ({ name, value }: NameValueType, index: number) {
              return (
                <TableRow hover key={`extra_info_${index}`}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
