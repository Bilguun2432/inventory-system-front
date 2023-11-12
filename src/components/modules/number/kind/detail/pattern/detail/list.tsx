"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import { useListSwr } from "./api";
import { NumberKindPatternType } from "@/types/modules/number";
import NumberKindPatternForm from "./form";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import NumberKindPatternDelete from "@/components/modules/number/kind/detail/pattern/detail/delete";

interface ListProps {
  id: any;
}

export default function NumberKindPatternDetailList(props: ListProps) {
  const theme = useTheme();
  const { id } = props;
  const { data, mutate } = useListSwr(id);

  const { showModal, hideModal }: any = useContext(ModalContext);
  console.log("del=<>", data);
  function onModalEdit(numberKindPatternType: NumberKindPatternType) {
    showModal(
      `Edit Pattern /${numberKindPatternType.numberKind?.name}/`,
      <NumberKindPatternForm
        numberKindId={id}
        id={numberKindPatternType.id}
        onComplete={onMutateComplete}
      />,
    );
  }

  function btnDeleteClick(entity: NumberKindPatternType) {
    showModal(
      `Delete Pattern /${entity.numberKind?.name}/`,
      <NumberKindPatternDelete
        id={entity.id}
        numberKindPattern={entity}
        onComplete={() => {
          console.log("deleted");
          hideModal();
          mutate();
        }}
      />,
    );
  }

  function createNewClick() {
    showModal(
      `Create new Pattern`,
      <NumberKindPatternForm
        numberKindId={props.id}
        onComplete={onMutateComplete}
      />,
    );
  }

  async function onMutateComplete() {
    await mutate();
    hideModal();
  }

  return (
    <>
      <Stack direction="row" justifyContent="end" sx={{ mb: theme.spacing(2) }}>
        <Button
          variant="outlined"
          size="small"
          onClick={createNewClick}
          sx={{ ml: theme.spacing(1) }}
        >
          New Pattern
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;Edit</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;Delete</TableCell>
            </TableRow>
          </TableHead>

          {Array.isArray(data) && (
            <TableBody>
              {data &&
                data?.map(function (numberKindPattern: any) {
                  return (
                    <TableRow
                      key={`numberKindPattern_row_${numberKindPattern.id}`}
                    >
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {numberKindPattern.id}
                      </TableCell>
                      <TableCell>{numberKindPattern.pattern}</TableCell>
                      <TableCell>
                        <ButtonGroup
                          variant="contained"
                          aria-label="outlined primary button group"
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ ml: theme.spacing(0) }}
                            onClick={() => {
                              onModalEdit(numberKindPattern);
                            }}
                            style={{}}
                          >
                            Edit
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell>
                        <ButtonGroup
                          variant="contained"
                          aria-label="contained primary button group"
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ ml: theme.spacing(0) }}
                            onClick={() => {
                              btnDeleteClick(numberKindPattern);
                            }}
                            style={{
                              color: "red",
                              borderColor: "red",
                            }}
                          >
                            Delete
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
