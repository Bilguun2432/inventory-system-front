"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TransactionProductSimType } from "@/types/modules/transaction";
import SimCardIcon from "@mui/icons-material/SimCard";
import { grey } from "@mui/material/colors";

export default function TransactionProductSim({ sim }: { sim: TransactionProductSimType }) {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell>
            <SimCardIcon fontSize="small" sx={{ color: grey[600] }} />
          </TableCell>
          <TableCell>{sim.accNumber}</TableCell>
          <TableCell>{sim.productService}</TableCell>
          <TableCell>{sim.simType}</TableCell>
          <TableCell>{sim.iccid}</TableCell>
          <TableCell>{sim.state}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
