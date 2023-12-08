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
import { useListSwr } from "./api";
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
import { ActionType } from "@/types/modules/action";

export default function EmployeeBrokenList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;

  const { data: list } = useListSwr();

  console.log("hi", list);

  const theme = useTheme();

  const { data } = useSession();
  const { data: authUser } = useDetailEmailSwr(data?.user?.email);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Бүтээгдэхүүний нэр</TableCell>
              <TableCell>Бүтээгдэхүүний дэлгэрэнгүй</TableCell>
              <TableCell>Бүтээгдэхүүний үнэ</TableCell>
              <TableCell>unit</TableCell>
              <TableCell>description</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;Үүсгэсэн огноо</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list &&
              list.map((action: ActionType) => (
                <TableRow key={`auth_user_row_${action.id}`}>
                  <TableCell className="p-1 border border-slate-300 text-center font-bold">{action.id}</TableCell>
                  <TableCell>{action.Product?.name}</TableCell>
                  <TableCell>{action.Product?.description}</TableCell>
                  <TableCell>{action.Product?.price}</TableCell>
                  <TableCell>{action.unit}</TableCell>
                  <TableCell>{action.description}</TableCell>
                  <TableCell>{dayjs(action.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
