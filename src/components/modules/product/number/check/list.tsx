"use client";

import { useListSwr } from "./api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductNumberCheckType } from "@/types/modules/product";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect, MouseEvent, ChangeEvent, useContext } from "react";
import TablePagination from "@mui/material/TablePagination";
import { productNumberCheckAPI } from "./api";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useTheme } from "@mui/material/styles";
import ProductNumberCheckNew from "./new";
import { AxiosError, AxiosResponse } from "axios";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import Typography from "@mui/material/Typography";
import FormFilter from "./FormFilter";
import ProductNumberCheckEdit from "@/components/modules/product/number/check/edit";

export interface ProductNumberCheckPaginationModelType extends PaginationModelType {
  items?: ProductNumberCheckType[];
}

export interface ProductNumberCheckFilterModelType {
  name?: string;
  description?: string;
}

export interface ProductNumberCheckListRequestType {
  filter: ProductNumberCheckFilterModelType;
  sort: SortModelType;
  pagination: ProductNumberCheckPaginationModelType;
}

export interface ProductNumberChecksPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: ProductNumberCheckType[];
}

const pageSizeOptions = [10, 20, 40, 100];
const pageSizeDefault = 20;

const initialListRequest = {
  filter: {},
  sort: {},
  pagination: {
    page: 0,
    size: pageSizeDefault,
  },
};

export default function ProductNumberChecktList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<ProductNumberCheckListRequestType>(initialListRequest);
  const [productNumberChecksPaged, setProductNumberChecksPaged] = useState<ProductNumberChecksPagedType | null>(null);

  const theme = useTheme();

  async function onMutateComplete() {
    productNumberCheckAPI
      .listFilter(listReq)
      .then(function (response: AxiosResponse) {
        const { status, data } = response;
        if (status == 200) {
          setProductNumberChecksPaged(data);
        }
      })
      .catch(function (error: AxiosError) {
        console.error(error.message);
      });
    hideModal();
  }

  useEffect(
    function () {
      console.log("useCallback");
      productNumberCheckAPI
        .listFilter(listReq)
        .then(function (response: AxiosResponse) {
          const { status, data } = response;
          if (status == 200) {
            console.log("200", data);
            setProductNumberChecksPaged(data);
          }
        })
        .catch(function (error: AxiosError) {
          console.error(error.message);
        });
    },
    [listReq],
  );

  function btnEditClick(productNumberCheck: ProductNumberCheckType) {
    showModal(
      `Edit ProductNumberCheck /${productNumberCheck.name}/`,
      <ProductNumberCheckEdit productNumberCheck={productNumberCheck} onComplete={onMutateComplete} />,
      "md",
    );
  }

  function createNewClick() {
    showModal("Create new ProductNumberCheck", <ProductNumberCheckNew onComplete={onMutateComplete} />, "md");
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  function onFilterSubmit(filterData: ProductNumberCheckFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): ProductNumberCheckType[] {
    if (!(productNumberChecksPaged && productNumberChecksPaged.items)) {
      return [];
    }
    return productNumberChecksPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!productNumberChecksPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: productNumberChecksPaged.size,
    };

    const newListReq = { ...listReq, pagination: paging };
    setListReq(newListReq);
  };

  const onPageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = parseInt(event.target.value, 10);
    const paging = {
      page: 0,
      size: pageSize,
    };
    const newListReq = { ...listReq, pagination: paging };
    setListReq(newListReq);
  };

  console.log("getItems()", getItems());

  return (
    <>
      <Grid container sx={{ mb: 4 }}>
        <Grid item md={6}>
          <IconButton
            onClick={() => {
              setShowFilterForm(!showFilterForm);
            }}
          >
            <SearchIcon fontSize="large" />
          </IconButton>
        </Grid>

        <Grid item md={6}>
          <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
            <Button variant="outlined" size="small" color="secondary" onClick={createNewClick} sx={{ ml: theme.spacing(1) }}>
              New
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IDs</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>fieldType</TableCell>
                <TableCell>packageCode</TableCell>
                <TableCell>numberPrefix</TableCell>
                <TableCell>relateType</TableCell>
                <TableCell>enabled</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getItems().map(function (productNumberCheck: ProductNumberCheckType) {
                return (
                  <TableRow key={`product_number_check_row_${productNumberCheck.id}`}>
                    <TableCell className="p-1 border border-slate-300 text-center font-bold">{productNumberCheck.id}</TableCell>
                    <TableCell>{productNumberCheck.name}</TableCell>
                    <TableCell>{productNumberCheck.description}</TableCell>
                    <TableCell>{productNumberCheck.fieldType}</TableCell>
                    <TableCell>{productNumberCheck.packageCode}</TableCell>
                    <TableCell>{productNumberCheck.numberPrefix}</TableCell>
                    <TableCell>{productNumberCheck.relateType}</TableCell>
                    <TableCell>{productNumberCheck.enabled === true ? "true" : "false"}</TableCell>
                    <TableCell>
                      <IconButton size="medium" onClick={() => btnEditClick(productNumberCheck)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <OffCanvasPane open={showFilterForm} onClose={onFilterFormClose}>
        <Typography>ProductNumberCheck Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>

      <Grid container sx={{ mb: 2 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          {productNumberChecksPaged && (
            <TablePagination
              component="div"
              count={productNumberChecksPaged.totalItems}
              page={productNumberChecksPaged.page}
              rowsPerPage={productNumberChecksPaged.size}
              rowsPerPageOptions={pageSizeOptions}
              onPageChange={onPageChange}
              onRowsPerPageChange={onPageSizeChange}
              showFirstButton
              showLastButton
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
