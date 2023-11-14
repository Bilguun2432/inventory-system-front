"use client";

import dayjs from "dayjs";
// import Link from "next/link";
import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import { ClientType } from "@/types/modules/client";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import { useProductSwr, useProductUnitSwr } from "./api";
import TableContainer from "@mui/material/TableContainer";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ProductCompletionForm from "./form";
import { ProductType } from "@/types/modules/product";
import React from "react";
import Grid from "@mui/material/Grid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

interface ListProps {
  id: any;
  onComplete?: () => void;
}

export default function CategoryList(props: ListProps) {
  const { id, onComplete } = props;
  const { data, mutate } = useProductSwr(id);
  const { data: unitData } = useProductUnitSwr(id);

  console.log("hi", data);
  console.log("hh", unitData);

  const { showModal, hideModal }: any = useContext(ModalContext);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            className="p-4 text-black"
            style={{
              borderRadius: "5%",
              width: "250px",
              height: "80px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "24px", fontWeight: "bold" }}>{unitData?.productUnit}</div>
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Нийт бүтээгдэхүүн</div>
            </div>
            <ContentPasteIcon style={{ fontSize: "75px", paddingRight: "10px" }} color="primary" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            className="p-4 text-black"
            style={{
              borderRadius: "5%",
              width: "250px",
              height: "80px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "24px", fontWeight: "bold" }}>{unitData?.unit}</div>
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Нийт бүтээгдэхүүн тоо</div>
            </div>
            <AssignmentIcon style={{ fontSize: "75px", paddingRight: "10px" }} color="primary" />
          </Paper>
        </Grid>
      </Grid>
      <br></br>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Нэр</TableCell>
              <TableCell>Тайлбар</TableCell>
              <TableCell>Үнэ</TableCell>
              <TableCell>Тоо</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;timeCreated</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;Edit</TableCell>
              <TableCell>Шилжүүлэх</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((product: ProductType) => (
              <TableRow key={`completion_row_${product.id}`}>
                <TableCell className="p-1 border border-slate-300 text-center font-bold">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{dayjs(product.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
