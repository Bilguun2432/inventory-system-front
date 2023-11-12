"use client";

import dayjs from "dayjs";
// import Link from "next/link";
import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import { ClientType } from "@/types/modules/client";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import { useDetailSwr } from "./api";
import TableContainer from "@mui/material/TableContainer";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ProductCompletionForm from "./form";

interface ListProps {
  id: any;
  onComplete?: () => void;
}

export default function CategoryList(props: ListProps) {
  const { id, onComplete } = props;
  const { data, mutate } = useDetailSwr(id);

  const { showModal, hideModal }: any = useContext(ModalContext);
  function btnEditClick(entity: ClientType) {
    showModal(
      `Edit Product Category /${entity.id}/`,
      <ProductCompletionForm
        id={entity.id}
        onComplete={async function () {
          await mutate();
          onComplete ? onComplete() : null;
          hideModal();
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
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;timeCreated</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow key={`completion_row_${data?.id}`}>
              <TableCell className="p-1 border border-slate-300 text-center font-bold">
                {data?.id}
              </TableCell>
              <TableCell>{data?.name}</TableCell>
              <TableCell>{data?.description}</TableCell>
              <TableCell>
                {dayjs(data?.timeCreated).format("YYYY-MM-DD HH:mm:ss")}
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
