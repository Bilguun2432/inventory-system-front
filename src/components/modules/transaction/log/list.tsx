"use client";

import { useSearchSwr } from "./api";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";
import TransactionLogSearch from "./search";
import TablePagination from "@mui/material/TablePagination";

export default function ProductCategoryList() {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  const [dataObj, setDataObj] = React.useState<any>();
  const [count, setCount] = React.useState<number>(0);
  const [dataFiltered, setDataFiltered] = React.useState<any>();
  const { trigger: triggerUpdate } = useSearchSwr();

  const sendData = {
    filter: {},
    sort: {
      field: "email",
      sortType: "asc",
    },
    pagination: {
      page: page,
      size: rowsPerPage,
    },
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const aFunction = async (data: any) => {
    const result = await triggerUpdate(data);
    setDataObj(result?.items);
    setCount(result?.totalItems);
  };

  React.useEffect(
    function () {
      if (!dataFiltered) {
        aFunction(sendData);
      }
    },
    [page, rowsPerPage],
  );

  React.useEffect(
    function () {
      setDataObj(dataFiltered?.items);
      setCount(dataFiltered?.totalItems);
    },
    [dataFiltered],
  );

  return (
    <>
      <div style={{ marginTop: "10px" }}></div>
      <br />
      <div style={{ display: "flex", cursor: "pointer" }}>
        <TransactionLogSearch changeData={setDataFiltered} page={page} rowsPerPage={rowsPerPage} setPage={setPage} />
      </div>

      <TableContainer component={Paper}>
        <Table className="w-full table-fixed" size="small">
          <TableHead>
            <TableRow>
              <TableCell className="border border-slate-300">ID</TableCell>
              <TableCell className="border border-slate-300">transactionId</TableCell>
              <TableCell className="border border-slate-300">transactionInvoiceId</TableCell>
              <TableCell className="border border-slate-300">transactionProductId</TableCell>
              <TableCell className="border border-slate-300">logLevel</TableCell>
              <TableCell className="border border-slate-300">logType</TableCell>
              <TableCell className="border border-slate-300">message</TableCell>
              <TableCell className="border border-slate-300">timeCreated</TableCell>
            </TableRow>
          </TableHead>

          {typeof dataObj === "object" && (
            <TableBody>
              {Array.isArray(dataObj) &&
                dataObj?.map(function (transactionLog: any) {
                  return (
                    <TableRow key={`transaction_log_row_${transactionLog.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.id}</TableCell>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.transactionId}</TableCell>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.transactionInvoiceId}</TableCell>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.transactionProductId}</TableCell>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.logLevel}</TableCell>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.logType}</TableCell>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.message}</TableCell>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">{transactionLog.timeCreated}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
        <TablePagination
          component="div"
          count={count ? count : 0}
          page={!count || count <= 0 ? 0 : page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={`Rows:`}
          labelDisplayedRows={({ page }) => {
            return `Page: ${page + 1}`;
          }}
          SelectProps={{
            inputProps: {
              "aria-label": "page number",
            },
          }}
          showFirstButton={true}
        />
      </TableContainer>
    </>
  );
}
