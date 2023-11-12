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
import { useListSwr } from "./api";

export default function AuthRoleList() {
  const { data } = useListSwr();

  // console.log("data", data);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>firstname</TableCell>
              <TableCell>lastname</TableCell>
              <TableCell>email</TableCell>
              <TableCell>mobile</TableCell>
              <TableCell>edit role</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data.data &&
                data.data.map(function (authUser: any) {
                  return (
                    <TableRow key={`authRole_detail_row_${authUser.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{authUser.id}</TableCell>
                      <TableCell>{authUser.firstname}</TableCell>
                      <TableCell>{authUser.lastname}</TableCell>
                      <TableCell>{authUser.email}</TableCell>
                      <TableCell>{authUser.mobile}</TableCell>
                      <TableCell>
                        <Link href={`/auth/user/${authUser.id}/role/detail`}>
                          <Button variant="text" size="small" color="warning">
                            <EditIcon />
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
