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
import { useTheme } from "@mui/material/styles";
import { useListSwr } from "./api";
import { NumberKindType } from "@/types/modules/number";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ButtonGroup from "@mui/material/ButtonGroup";
import NumberKindDelete from "./delete";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface ListProps {
  onModalEdit?: (numberKindType: NumberKindType) => void;
}

export default function NumberKindList(props: ListProps) {
  const theme = useTheme();
  const { data: numberKindList, mutate } = useListSwr();

  console.log("data", numberKindList);

  const { showModal, hideModal }: any = useContext(ModalContext);

  function btnDeleteClick(entity: NumberKindType) {
    showModal(
      `Delete Pattern /${entity.name}/`,
      <NumberKindDelete
        id={entity.id}
        numberKind={entity}
        onComplete={() => {
          console.log("deleted");
          hideModal();
          mutate();
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
              <TableCell>Нэр</TableCell>
              <TableCell>Онцгой дугаар</TableCell>
              <TableCell>SystemId</TableCell>
              <TableCell>Үнэ</TableCell>
              <TableCell>Дэлгэрэнгүй</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {numberKindList &&
              numberKindList.map(function (numberKind: any) {
                return (
                  <TableRow key={`authRole_row_${numberKind.id}`}>
                    <TableCell>{numberKind.id}</TableCell>
                    <TableCell>{numberKind.name}</TableCell>
                    <TableCell>{numberKind.isSpecial.toString()}</TableCell>
                    <TableCell>{numberKind.systemId}</TableCell>
                    <TableCell>{numberKind.price}</TableCell>
                    <TableCell>
                      <Link href={`/number/kind/${numberKind.id}/detail`}>
                        <Button variant="outlined" size="small" color="info">
                          <ArrowCircleRightIcon />
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="contained primary button group">
                        <Button
                          variant="text"
                          size="small"
                          color="info"
                          sx={{ ml: theme.spacing(0) }}
                          onClick={() => {
                            btnDeleteClick(numberKind);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
