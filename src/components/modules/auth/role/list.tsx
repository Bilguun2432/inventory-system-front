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
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AuthRoleEdit from "@/components/modules/auth/role/edit";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";

export default function AuthRoleList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;

  const theme = useTheme();

  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  const { data, error, isLoading, mutate } = useListSwr();

  function btnEditClick(authRole: AuthRoleType) {
    showModal(`Edit AuthRole /${authRole.name}/`, <AuthRoleEdit id={authRole.id} onComplete={onMutateComplete} />, "md");
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Нэр</TableCell>
              <TableCell>Тайлбар</TableCell>
              <TableCell>Засах</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data.map(function (authRole: AuthRoleType) {
                  return (
                    <TableRow key={`authRole_row_${authRole.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{authRole.id}</TableCell>
                      <TableCell>{authRole.name}</TableCell>
                      <TableCell>{authRole.description}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ ml: theme.spacing(0) }}
                            onClick={() => {
                              btnEditClick(authRole);
                            }}
                          >
                            Edit
                          </Button>
                        </ButtonGroup>
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
