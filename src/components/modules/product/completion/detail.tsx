"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import { ProductCompletionType } from "@/types/modules/product";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import { useDetailSwr } from "./api";
import TableContainer from "@mui/material/TableContainer";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ProductCompletionEdit from "./edit";

interface DetailProps {
  id: number;
  onLoadSuccess?: (p: ProductCompletionType) => void;
}

export default function ProductCompletionDetail(props: DetailProps) {
  const { id, onLoadSuccess } = props;
  // const { data, error, isLoading, mutate } = useDetailSwr(id);
  const { data, mutate } = useDetailSwr(id);

  const { showModal, hideModal }: any = useContext(ModalContext);

  useEffect(
    function () {
      console.log("useCallback");

      if (!data) {
        return;
      }

      if (onLoadSuccess) {
        onLoadSuccess(data);
      }
    },
    [data],
  );

  function btnEditClick(entity: ProductCompletionType) {
    showModal(
      `Edit Product Component /${entity.id}/`,
      <ProductCompletionEdit
        id={entity.id}
        onComplete={async function () {
          mutate();
          hideModal();
        }}
      />,
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell></TableCell>
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
