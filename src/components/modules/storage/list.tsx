"use client";

import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { AuthUserType } from "@/types/modules/auth_user";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { AxiosError, AxiosResponse } from "axios";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import Typography from "@mui/material/Typography";
import BadgeIcon from "@mui/icons-material/Badge";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TaskIcon from "@mui/icons-material/Task";
import LocalMallIcon from "@mui/icons-material/LocalMall";

export default function AuthUserList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;

  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const theme = useTheme();

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: "40px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            className="p-4 text-black"
            style={{
              borderRadius: "5%",
              width: "250px",
              height: "100px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "24px", fontWeight: "bold" }}>11</div>
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Нийт ажилчдын тоо</div>
            </div>
            <BadgeIcon style={{ fontSize: "75px", paddingRight: "10px" }} color="primary" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            className="p-4 text-black"
            style={{
              borderRadius: "5%",
              width: "250px",
              height: "100px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "24px", fontWeight: "bold" }}>12</div>
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Нийт бүтээгдэхүүний тоо</div>
            </div>
            <LocalMallIcon style={{ fontSize: "75px", paddingRight: "10px" }} color="primary" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            className="p-4 text-black"
            style={{
              borderRadius: "5%",
              width: "250px",
              height: "100px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "24px", fontWeight: "bold" }}>10</div>
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Нийт эвдрэлтэй бүтээгдэхүүний тоо</div>
            </div>
            <NoteAddIcon style={{ fontSize: "75px", paddingRight: "10px" }} color="primary" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            className="p-4 text-black"
            style={{
              borderRadius: "5%",
              width: "250px",
              height: "100px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "24px", fontWeight: "bold" }}>123</div>
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Сүүлийн 3 сарын зарсан бүтээгдэхүүний тоо</div>
            </div>
            <TaskIcon style={{ fontSize: "75px", paddingRight: "10px" }} color="primary" />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
