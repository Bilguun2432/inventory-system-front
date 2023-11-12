"use client";

import { useState, useContext, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import { AxiosError, AxiosResponse } from "axios";

import { ModalContext } from "@/components/layout/mui/ModalProvider";

import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { ProductType } from "@/types/modules/product";
import ProductNew from "./new";
import FormFilter from "./FormFilter";
import ProductThumb from "./Thumb";

import { productAPI } from "./api";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

export interface ProductPaginationModelType extends PaginationModelType {
  items?: ProductType[];
}

export interface ProductFilterModelType {
  name?: string;
  description?: string;
  priceMin?: number;
  priceMax?: number;
}

export interface ProductListRequestType {
  filter: ProductFilterModelType;
  sort: SortModelType;
  pagination: ProductPaginationModelType;
}

export interface ProductsPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: ProductType[];
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

export default function ProductList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<ProductListRequestType>(initialListRequest);
  const [productsPaged, setProductsPaged] = useState<ProductsPagedType | null>(null);

  const theme = useTheme();

  async function onMutateComplete() {
    productAPI
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
    showModal("Create new Product", <ProductNew onComplete={onMutateComplete} />, "md");
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(
    function () {
      console.log("useCallback");

      productAPI
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

  function onFilterSubmit(filterData: ProductFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): ProductType[] {
    if (!(productsPaged && productsPaged.items)) {
      return [];
    }
    return productsPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!productsPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: productsPaged.size,
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
          <Stack direction={"row"} justifyContent={"end"} sx={{ mb: 2 }}>
            <Link href="/product/create" style={{ marginLeft: theme.spacing(1) }}>
              <Button variant="outlined" size="small">
                New
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Grid>

      <Grid container sx={{ mb: 2 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          {productsPaged && (
            <TablePagination
              component="div"
              count={productsPaged.totalItems}
              page={productsPaged.page}
              rowsPerPage={productsPaged.size}
              rowsPerPageOptions={pageSizeOptions}
              onPageChange={onPageChange}
              onRowsPerPageChange={onPageSizeChange}
              showFirstButton
              showLastButton
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {getItems().map(function (product: ProductType) {
          return (
            <Grid item key={`product_grid_${product.id}`} lg={3} md={4} sm={12}>
              <ProductThumb product={product} />
            </Grid>
          );
        })}
      </Grid>

      <OffCanvasPane open={showFilterForm} onClose={onFilterFormClose}>
        <Typography>Product Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>
    </>
  );
}
