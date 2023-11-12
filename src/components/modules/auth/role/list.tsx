"use client";

import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

import { useListSwr } from "./api";
import { AuthRoleType } from "@/types/modules/auth_role";
interface ListProps {
  onModalEdit?: (productCategory: AuthRoleType) => void;
}

export default function AuthRoleList(props: ListProps) {
  // const { onModalEdit } = props;
  // const { data, error, isLoading, mutate } = useListSwr();
  const { data } = useListSwr();

  // function btnEditClick(entity: AuthRoleType) {
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
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>detail</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data.data &&
                data.data.map(function (authRole: any) {
                  return (
                    <TableRow key={`authRole_row_${authRole.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {authRole.id}
                      </TableCell>
                      <TableCell>{authRole.name}</TableCell>
                      <TableCell>{authRole.description}</TableCell>
                      <TableCell>
                        <Link href={`/auth/role/${authRole.id}/detail`}>
                          <IconButton size="medium">
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                      {/* <TableCell>
                        <Link href={`/auth/role/${authRole.id}/edit`}>
                          <Button variant="text" size="small" color="warning">
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(authRole);
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/auth/role/${authRole.id}/permission/detail`}
                        >
                          <Button variant="text" size="small" color="warning">
                            <EditIcon />
                          </Button>
                        </Link>
                      </TableCell> */}
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
