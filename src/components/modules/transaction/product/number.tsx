"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TransactionProductNumberType } from "@/types/modules/transaction";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { grey } from "@mui/material/colors";

export default function TransactionProductNumber({ number }: { number: TransactionProductNumberType }) {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell>
            <SmartphoneIcon fontSize="small" sx={{ color: grey[600] }} />
          </TableCell>
          <TableCell>{number.accNumber}</TableCell>
          <TableCell>{number.productService}</TableCell>
          <TableCell>{number.packageId}</TableCell>
          <TableCell>{number.creditLimit}</TableCell>
          <TableCell>{number.state}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
