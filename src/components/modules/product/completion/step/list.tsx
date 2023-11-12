"use client";

import { useListSwr } from "./api";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { ProductCompletionStepType, ProductCompletionType } from "@/types/modules/product";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import ProductCompletionStepNew from "./new";
import ProductCompletionStepEdit from "./edit";

export default function ProductCompletionStepList({ productCompletion }: { productCompletion: ProductCompletionType }) {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  // const { data, error, isLoading, mutate } = useListSwr(productCompletion.id);
  const { data, mutate } = useListSwr(productCompletion.id);

  async function onMutateComplete() {
    hideModal();
    mutate();
  }

  function createNewClick() {
    showModal("Create new Step", <ProductCompletionStepNew productCompletion={productCompletion} onComplete={onMutateComplete} />);
  }

  function btnEditClick(entity: ProductCompletionStepType) {
    console.log({ entity });

    showModal(
      `Edit ProductCompletionStep /${entity.id}/`,
      <ProductCompletionStepEdit
        productCompletion={productCompletion}
        id={entity.id}
        onComplete={async function () {
          await mutate();
          hideModal();
        }}
      />,
    );
  }

  console.log("data", data);

  return (
    <>
      <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
        <Button variant="outlined" size="small" color="secondary" onClick={createNewClick} sx={{ ml: theme.spacing(1) }}>
          New Step
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product Service</TableCell>
              <TableCell>Charge Service</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Time Created</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data?.map(function (step: ProductCompletionStepType) {
                  return (
                    <TableRow key={`product_completion_step_${step.id}`}>
                      <TableCell>{step.productService}</TableCell>
                      <TableCell>{step.chargeService}</TableCell>
                      <TableCell> {step.orderIndex}</TableCell>
                      <TableCell>{dayjs(step.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                      <TableCell>
                        <Stack direction="row" justifyContent="flex-end">
                          <Button
                            variant="outlined"
                            size="small"
                            color="warning"
                            onClick={() => {
                              btnEditClick(step);
                            }}
                          >
                            <EditIcon />
                          </Button>
                        </Stack>
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
