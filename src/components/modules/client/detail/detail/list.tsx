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
import Typography from "@mui/material/Typography";

// import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useListSwr } from "./api";
import dayjs from "dayjs";
import { ClientType } from "@/types/modules/client";

import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";
import ClientForm from "@/components/modules/client/form";
import { MessageType } from "@/types/component";
import ErrorContext from "@/context/fast_msg_context";
import { useTheme } from "@mui/material/styles";

interface ListProps {
  id: any;
}

export default function ClientList(props: ListProps) {
  const theme = useTheme();

  const { id } = props;
  const { data, mutate } = useListSwr(id);
  const errorContext = useContext(ErrorContext);
  const { showModal, hideModal }: any = useContext(ModalContext);

  function btnEditClick(entity: ClientType) {
    showModal(
      `Edit Client /${entity.id}/`,
      <ClientForm
        id={entity.id}
        onComplete={async function () {
          await mutate();
          hideModal();
          errorContext?.setAlertMsg("client editted", MessageType.success);
        }}
      />,
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>clientKind</TableCell>
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              {/* <TableCell>userCreatedId</TableCell> */}
              <TableCell>timeCreated</TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  component="span"
                  bgcolor={"error"}
                  style={{
                    color: "white",
                  }}
                >
                  Active
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data && (
                <TableRow key={`client_row_${data.id}`}>
                  <TableCell className="p-1 border border-slate-300 text-center font-bold">
                    {data.id}
                  </TableCell>
                  <TableCell>{data.clientKind?.name}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  {/* <TableCell>{data.userCreatedId}</TableCell> */}
                  <TableCell>
                    {dayjs(data.timeCreated).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      onClick={() => {
                        btnEditClick(data);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
