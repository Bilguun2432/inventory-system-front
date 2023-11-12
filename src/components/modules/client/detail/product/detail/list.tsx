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
import { useTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import { useDetailSwr } from "./api";
import { ClientProductType } from "@/types/modules/client";
import ClientProductForm from "@/components/modules/client/detail/product/detail/form";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext } from "react";

interface ListProps {
  id: any;
}

export default function ClientProductList(props: ListProps) {
  const theme = useTheme();
  const { id } = props;
  // const { data, error, isLoading, mutate } = useDetailSwr(id);
  const { data, mutate } = useDetailSwr(id);

  const { showModal, hideModal }: any = useContext(ModalContext);

  function btnEditClick(entity: ClientProductType) {
    showModal(
      `Edit ClientProductee  /${entity.id}/`,
      <ClientProductForm
        clientId={id}
        id={entity.id}
        onComplete={onMutateComplete}
      />,
    );
  }

  function createNewClick() {
    showModal(
      "Create new ClientProduct",
      <ClientProductForm clientId={props.id} onComplete={onMutateComplete} />,
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
          New Product
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>product</TableCell>
              <TableCell>useCustomPrice</TableCell>
              <TableCell>price</TableCell>
              {/* <TableCell>userCreatedId</TableCell> */}
              <TableCell>timeCreated</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data?.map(function (clientProduct: any) {
                  return (
                    <TableRow key={`clientProduct_row_${clientProduct.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {clientProduct.id}
                      </TableCell>
                      <TableCell>{clientProduct.product?.name}</TableCell>
                      <TableCell>
                        {clientProduct.useCustomPrice ? "true" : "false"}
                      </TableCell>
                      {/* <TableCell>{clientProduct.useCustomPrice}</TableCell> */}
                      <TableCell>{clientProduct.price}</TableCell>
                      {/* <TableCell>{clientProduct.userCreatedId}</TableCell> */}
                      <TableCell>
                        {dayjs(clientProduct.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            btnEditClick(clientProduct);
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
