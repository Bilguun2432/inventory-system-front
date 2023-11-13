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
import { productCategoryAPI } from "./api";
import { ProductCategoryType } from "@/types/modules/product";
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
import ProductCategoryNew from "./new";
import ProductCategoryEdit from "./edit";

export interface ProductCategoryPaginationModelType extends PaginationModelType {
  items?: ProductCategoryType[];
}

export interface ProductCategoryFilterModelType {
  name?: string;
  description?: string;
}

export interface ProductCategoryListRequestType {
  filter: ProductCategoryFilterModelType;
  sort: SortModelType;
  pagination: ProductCategoryPaginationModelType;
}

export interface ProductCategorysPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: ProductCategoryType[];
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

export default function ProductCategoryList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<ProductCategoryListRequestType>(initialListRequest);
  const [productCategorysPaged, setProductsPaged] = useState<ProductCategorysPagedType | null>(null);

  const theme = useTheme();

  async function onMutateComplete() {
    productCategoryAPI
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
    showModal("Create new ProductCategory", <ProductCategoryNew onComplete={onMutateComplete} />, "md");
  }

  function btnEditClick(productCategory: ProductCategoryType) {
    showModal(`Edit ProductCategory /${productCategory.name}/`, <ProductCategoryEdit productCategory={productCategory} onComplete={onMutateComplete} />, "md");
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(
    function () {
      productCategoryAPI
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

  function onFilterSubmit(filterData: ProductCategoryFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): ProductCategoryType[] {
    if (!(productCategorysPaged && productCategorysPaged.items)) {
      return [];
    }
    return productCategorysPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!productCategorysPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: productCategorysPaged.size,
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
                <TableCell>Нэр</TableCell>
                <TableCell>Тайлбар</TableCell>
                <TableCell>Үүсгэсэн огноо</TableCell>
                <TableCell>Засах</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getItems().map(function (productCategory: ProductCategoryType) {
                return (
                  <TableRow key={`productCategory${productCategory.id}`}>
                    <TableCell>{productCategory.id}</TableCell>
                    <TableCell>{productCategory.name}</TableCell>
                    <TableCell>{productCategory.description}</TableCell>
                    <TableCell>{productCategory.timeCreated ? productCategory.timeCreated.toLocaleString() : "N/A"}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ ml: theme.spacing(0) }}
                          onClick={() => {
                            btnEditClick(productCategory);
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
          {productCategorysPaged && (
            <TablePagination
              component="div"
              count={productCategorysPaged.totalItems}
              page={productCategorysPaged.page}
              rowsPerPage={productCategorysPaged.size}
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
