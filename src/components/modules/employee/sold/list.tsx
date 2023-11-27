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
import { AuthUserProductType } from "@/types/modules/auth_user_product";
import FormFilter from "./FormFilter";
import { authUserProductAPI } from "./api";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import ButtonGroup from "@mui/material/ButtonGroup";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useDetailEmailSwr } from "./userapi";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";

export interface ProductPaginationModelType extends PaginationModelType {
  items?: AuthUserProductType[];
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
  items: AuthUserProductType[];
}

const pageSizeOptions = [20, 40, 60, 100];
const pageSizeDefault = 10;

const initialListRequest = {
  filter: {},
  sort: {},
  pagination: {
    page: 0,
    size: pageSizeDefault,
  },
};

export default function EmployeeProductList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;

  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<ProductListRequestType>(initialListRequest);
  const [productsPaged, setProductsPaged] = useState<ProductsPagedType | null>(null);

  const theme = useTheme();

  const { data } = useSession();
  const { data: authUser } = useDetailEmailSwr(data?.user?.email);

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authUserProductAPI.listFilter(authUser?.id, listReq);
        const { status, data } = response;
        if (status === 200) {
          setProductsPaged(data);
        }
      } catch (error) {
        console.error((error as AxiosError).message);
      }
    };

    fetchData();
  }, [authUser?.id, listReq]);

  function onFilterSubmit(filterData: ProductFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): AuthUserProductType[] {
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
            <SearchIcon fontSize="large" color="primary" />
          </IconButton>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ангилал</TableCell>
              <TableCell>Бүтээгдэхүүний нэр</TableCell>
              <TableCell>Дэлгэрэнгүй</TableCell>
              <TableCell>Үнэ</TableCell>
              <TableCell>Тоо</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;Үүсгэсэн огноо</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getItems().map(function (authUserProduct: AuthUserProductType) {
              return (
                <TableRow key={`completion_row_${authUserProduct.id}`}>
                  <TableCell className="p-1 border border-slate-300 text-center font-bold">{authUserProduct.id}</TableCell>
                  <TableCell>{authUserProduct.product?.category.name}</TableCell>
                  <TableCell>{authUserProduct.product?.name}</TableCell>
                  <TableCell>{authUserProduct.product?.description}</TableCell>
                  <TableCell>{authUserProduct.product?.price}</TableCell>
                  <TableCell>{authUserProduct.unit}</TableCell>
                  <TableCell>{dayjs(authUserProduct.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <OffCanvasPane open={showFilterForm} onClose={onFilterFormClose}>
        <Typography>Product Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>

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
    </>
  );
}
