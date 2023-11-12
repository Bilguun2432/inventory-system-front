"use client";

import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import { useListSwr } from "./api";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ButtonGroup from "@mui/material/ButtonGroup";
import ProductCompletionDelete from "./delete";
import { ProductCompletionType } from "@/types/modules/product";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";

// interface ListProps {
//   onModalEdit?: (productCategory: ProductCompletionType) => void;
// }

export default function ProductCompletionList() {
  const theme = useTheme();
  // const { onModalEdit } = props;
  const { data: productCompletions, mutate } = useListSwr();

  const { showModal, hideModal }: any = useContext(ModalContext);

  console.log("productCompletions", productCompletions);

  function btnDeleteClick(entity: ProductCompletionType) {
    showModal(
      `Delete Pattern /${entity.name}/`,
      <ProductCompletionDelete
        id={entity.id}
        productCompletion={entity}
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
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>timeCreated</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;Detail</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productCompletions &&
              productCompletions?.map(function (completion: any) {
                return (
                  <TableRow key={`completion_row_${completion.id}`}>
                    <TableCell className="p-1 border border-slate-300 text-center font-bold">{completion.id}</TableCell>
                    <TableCell>{completion.name}</TableCell>
                    <TableCell>{completion.description}</TableCell>
                    <TableCell>{dayjs(completion.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell>
                      <Link href={`${completion.id}/detail`}>
                        <Button variant="outlined" size="small" color="info">
                          <ArrowCircleRightIcon />
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="contained primary button group">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ ml: theme.spacing(0) }}
                          onClick={() => {
                            btnDeleteClick(completion);
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
        </Table>
      </TableContainer>
    </>
  );
}
