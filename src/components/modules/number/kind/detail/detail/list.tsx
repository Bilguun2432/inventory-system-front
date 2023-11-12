"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useListSwr } from "./api";
import { NumberKindType } from "@/types/modules/number";

import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";
import ErrorContext from "@/context/fast_msg_context";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";

interface ListProps {
  id: any;
  onModalEdit?: (numberKindType: NumberKindType) => void;
}

export default function NumberKindDetailList(props: ListProps) {
  const { id, onModalEdit } = props;
  const theme = useTheme();
  const { data, mutate } = useListSwr(id);
  const errorContext = useContext(ErrorContext);
  const { showModal, hideModal }: any = useContext(ModalContext);

  function btnEditClick(entity: NumberKindType) {
    if (onModalEdit) {
      onModalEdit(entity);
    }
  }

  return (
    <>
      <Box sx={{ mb: theme.spacing(2) }}>
        <Typography variant="h4">{data?.name || "No Name"}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Онцгой дугаар</TableCell>
              <TableCell>SystemId</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data && (
                <TableRow key={`number_kind_row_${data.id}`}>
                  <TableCell className="p-1 border border-slate-300 text-center font-bold">{data.id}</TableCell>
                  <TableCell>{data.isSpecial.toString()}</TableCell>
                  <TableCell>{data.systemId}</TableCell>
                  <TableCell>{data.price}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ ml: theme.spacing(0) }}
                        onClick={() => {
                          btnEditClick(data);
                        }}
                        style={{}}
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
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
