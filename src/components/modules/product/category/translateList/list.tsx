"use client";

import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@mui/material/TableContainer";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useDetailSwr } from "./api";
import TranslationForm from "./form";

interface ListProps {
  id: any;
  data: any;
}

export default function TranslationList(props: ListProps) {
  const { id, data } = props;
  const { mutate } = useDetailSwr(id);

  const { showModal, hideModal }: any = useContext(ModalContext);

  function btnEditClick() {
    showModal(
      `Edit Product Category Translate ${
        data?.lang === "mn" ? "Mongolia" : "English"
      } /${id}/`,
      <TranslationForm
        locale={data?.lang}
        id={id}
        onComplete={async function () {
          await mutate();
          hideModal();
        }}
      />,
    );
  }

  return (
    <>
      <TableContainer component={Paper} style={{ width: "38vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>translate</TableCell>
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow key={`completion_row_${data?.id}`}>
              <TableCell>
                {data?.lang === "mn" ? "Mongolia" : "English"}
              </TableCell>
              <TableCell>{data?.name}</TableCell>
              <TableCell>{data?.description}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="warning"
                  onClick={() => {
                    btnEditClick();
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
