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
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

import { useListSwr } from "./api";
import { ProductAttributeType } from "@/types/modules/product";
import { ProductType } from "@/types/modules/product";
import ButtonGroup from "@mui/material/ButtonGroup";

import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ProductAttributeForm from "@/components/modules/product/attribute/form";

interface ListProps {
  onModalEdit?: (productAttributeType: ProductAttributeType) => void;
}

export default function ProductAttributeList({
  product,
  ...props
}: ListProps & { product: ProductType }) {
  const { onModalEdit } = props;
  const productWithId = product as ProductType & { id: number };
  const { data, mutate } = useListSwr(productWithId.id);

  function btnEditClick(entity: ProductAttributeType) {
    if (onModalEdit) {
      onModalEdit(entity);
    }
  }

  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function createNewClick() {
    showModal(
      "Create new ProductAttribute",
      <ProductAttributeForm product={product} onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={createNewClick}
          sx={{ ml: theme.spacing(1) }}
        >
          New
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>SystemField</TableCell>
              <TableCell>PriceExtra</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data &&
                data.map(function (productAttribute: any) {
                  return (
                    <TableRow key={`clientProduct_row_${productAttribute.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {productAttribute.id}
                      </TableCell>
                      <TableCell>{productAttribute.systemField}</TableCell>
                      <TableCell>{productAttribute.priceExtra}</TableCell>
                      <TableCell>
                        {productAttribute.translates[0].name}
                      </TableCell>
                      <TableCell>
                        {productAttribute.translates[0].description}
                      </TableCell>
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
                              btnEditClick(productAttribute);
                            }}
                            style={{}}
                          >
                            Edit
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
