"use client";

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
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import { useDetailSwr } from "./api";
import { ClientAccountType } from "@/types/modules/client";
import ClientAccountForm from "@/components/modules/client/detail/account/detail/form";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";

interface ListProps {
  id: any;
}

export default function ClientAccountList(props: ListProps) {
  const { id } = props;
  // const { data, error, isLoading, mutate } = useDetailSwr(id);
  const { data, mutate } = useDetailSwr(id);
  const theme = useTheme();

  const { showModal, hideModal }: any = useContext(ModalContext);

  function btnEditClick(entity: ClientAccountType) {
    showModal(
      `Edit ClientAccount /${entity.id}/`,
      <ClientAccountForm
        clientId={id}
        id={entity.id}
        onComplete={onMutateComplete}
      />,
    );
  }
  function createNewClick1() {
    showModal(
      "Create new ClientAccount",
      <ClientAccountForm clientId={id} onComplete={onMutateComplete} />,
    );
  }

  async function onMutateComplete() {
    await mutate();
    hideModal();
  }

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={createNewClick1}
          sx={{ ml: theme.spacing(1) }}
        >
          New Account
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>accountNumber</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data?.map(function (clientAccount: any) {
                  return (
                    <TableRow key={`clientAccount_row_${clientAccount.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {clientAccount.id}
                      </TableCell>
                      <TableCell>{clientAccount.accountNumber}</TableCell>
                      <TableCell>
                        {dayjs(clientAccount.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(clientAccount);
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
