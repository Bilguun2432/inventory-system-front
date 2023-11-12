"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, MouseEvent, ChangeEvent, useContext } from "react";
import TablePagination from "@mui/material/TablePagination";
import { productConfAPI } from "./api";
import { ProductConfType } from "@/types/modules/product";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { AxiosError, AxiosResponse } from "axios";
import Stack from "@mui/material/Stack";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import Typography from "@mui/material/Typography";
import FormFilter from "./FormFilter";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ProductConfNew from "./new";
import ProductConfEdit from "@/components/modules/product/conf/edit";

export interface ProductConfPaginationModelType extends PaginationModelType {
  items?: ProductConfType[];
}

export interface ProductConfFilterModelType {
  name?: string;
  description?: string;
}

export interface ProductConfListRequestType {
  filter: ProductConfFilterModelType;
  sort: SortModelType;
  pagination: ProductConfPaginationModelType;
}

export interface ProductConfsPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: ProductConfType[];
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

export default function ProductConfList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<ProductConfListRequestType>(initialListRequest);
  const [productConfsPaged, setProductsPaged] = useState<ProductConfsPagedType | null>(null);

  const theme = useTheme();

  async function onMutateComplete() {
    productConfAPI
      .listFilter(listReq)
      .then(function (response: AxiosResponse) {
        const { status, data } = response;
        if (status == 200) {
          setProductsPaged(data);
        }
      })
      .catch(function (error: AxiosError) {
        console.error(error.message);
      });
    hideModal();
  }

  function createNewClick() {
    showModal("Create new ProductConf", <ProductConfNew onComplete={onMutateComplete} />, "md");
  }

  function btnEditClick(productConf: ProductConfType) {
    showModal(`Edit ProductConf /${productConf.name}/`, <ProductConfEdit productConf={productConf} onComplete={onMutateComplete} />, "md");
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(
    function () {
      productConfAPI
        .listFilter(listReq)
        .then(function (response: AxiosResponse) {
          const { status, data } = response;
          if (status == 200) {
            setProductsPaged(data);
          }
        })
        .catch(function (error: AxiosError) {
          console.error(error.message);
        });
    },
    [listReq],
  );

  function onFilterSubmit(filterData: ProductConfFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): ProductConfType[] {
    if (!(productConfsPaged && productConfsPaged.items)) {
      return [];
    }
    return productConfsPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!productConfsPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: productConfsPaged.size,
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
          <Stack direction={"row"} justifyContent={"end"}>
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
                <TableCell>ID</TableCell>
                <TableCell>name</TableCell>
                <TableCell>description</TableCell>
                <TableCell>chargeService</TableCell>
                <TableCell>serviceType</TableCell>
                <TableCell>numberCheck</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getItems().map(function (productConf: ProductConfType) {
                return (
                  <TableRow key={`productConf${productConf.id}`}>
                    <TableCell>{productConf.id}</TableCell>
                    <TableCell>{productConf.name}</TableCell>
                    <TableCell>{productConf.description}</TableCell>
                    <TableCell>{productConf.chargeService}</TableCell>
                    <TableCell>{productConf.serviceType}</TableCell>
                    <TableCell>{productConf.numberCheck ? "true" : "false"}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ ml: theme.spacing(0) }}
                          onClick={() => {
                            btnEditClick(productConf);
                          }}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <OffCanvasPane open={showFilterForm} onClose={onFilterFormClose}>
        <Typography>Product Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>

      <Grid container sx={{ mb: 2 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          {productConfsPaged && (
            <TablePagination
              component="div"
              count={productConfsPaged.totalItems}
              page={productConfsPaged.page}
              rowsPerPage={productConfsPaged.size}
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
