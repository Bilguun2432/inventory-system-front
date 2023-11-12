"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TransactionProductChargeType } from "@/types/modules/transaction";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { grey } from "@mui/material/colors";

export default function TransactionProductCharge({ charge }: { charge: TransactionProductChargeType }) {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell>
            <AccountBalanceWalletIcon fontSize="small" sx={{ color: grey[600] }} />
          </TableCell>
          <TableCell>{charge.accNumber}</TableCell>
          <TableCell>{charge.productService}</TableCell>
          <TableCell>{charge.priceAmount}</TableCell>
          <TableCell>{charge.pricePlanCode}</TableCell>
          <TableCell>{charge.chargeService}</TableCell>
          <TableCell>{charge.state}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
