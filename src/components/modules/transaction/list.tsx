"use client";

import { useState, useEffect, MouseEvent, ChangeEvent, useContext } from "react";
import { transactionAPI } from "./api";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Link from "next/link";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { TransactionType } from "@/types/modules/transaction";
import PaymentState from "./PaymentState";
import dayjs from "dayjs";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { useTheme } from "@mui/material/styles";
import { AxiosError, AxiosResponse } from "axios";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import Grid from "@mui/material/Grid";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import FormFilter from "./FormFilter";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export interface TransactionPaginationModelType extends PaginationModelType {
  items?: TransactionType[];
}

export interface TransactionFilterModelType {
  transactionCode?: string;
  priceTotal?: number;
  state?: string;
  statePayment?: string;
}

export interface TransactionListRequestType {
  filter: TransactionFilterModelType;
  sort: SortModelType;
  pagination: TransactionPaginationModelType;
}

export interface TransactionsPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: TransactionType[];
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

export default function TransactionList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<TransactionListRequestType>(initialListRequest);
  const [transactionsPaged, setTransactionsPaged] = useState<TransactionsPagedType | null>(null);

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(
    function () {
      transactionAPI
        .listFilter(listReq)
        .then(function (response: AxiosResponse) {
          const { status, data } = response;
          if (status == 200) {
            setTransactionsPaged(data);
          }
        })
        .catch(function (error: AxiosError) {
          console.error(error.message);
        });
    },
    [listReq],
  );

  function onFilterSubmit(filterData: TransactionFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): TransactionType[] {
    if (!(transactionsPaged && transactionsPaged.items)) {
      return [];
    }
    return transactionsPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!transactionsPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: transactionsPaged.size,
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
      </Grid>

      <Grid container spacing={1}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Гүйлгээний дугаар</TableCell>
                <TableCell>Нийт үнэ</TableCell>
                <TableCell>Төлөв</TableCell>
                <TableCell>Төлбөр</TableCell>
                <TableCell>Үүссэн цаг</TableCell>
                <TableCell>Дууссан цаг</TableCell>
                <TableCell>Дэлгэрэнгүй</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getItems().map(function (transaction: TransactionType) {
                return (
                  <TableRow key={`transaction${transaction.id}`}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.transactionCode}</TableCell>
                    <TableCell>{transaction.priceTotal.toLocaleString("en-US")}</TableCell>
                    <TableCell>{transaction.state}</TableCell>
                    <TableCell>
                      <PaymentState state={transaction.statePayment} />
                    </TableCell>
                    <TableCell>{transaction.timeCreated && <>{dayjs(transaction.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</>}</TableCell>
                    <TableCell>{transaction.timeCompleted && <>{dayjs(transaction.timeCompleted).format("YYYY-MM-DD HH:mm:ss")}</>}</TableCell>
                    <TableCell>
                      <Link href={`/transaction/${transaction.id}/detail`}>
                        <Button variant="outlined" size="small" color="info">
                          <ArrowCircleRightIcon />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <OffCanvasPane open={showFilterForm} onClose={onFilterFormClose}>
        <Typography>Transaction Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>

      <Grid container sx={{ mb: 2 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          {transactionsPaged && (
            <TablePagination
              component="div"
              count={transactionsPaged.totalItems}
              page={transactionsPaged.page}
              rowsPerPage={transactionsPaged.size}
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
