"use client";

import { useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import { useDetailSwr } from "./api";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import ProductConfEdit from "./edit";
import { ProductConfType } from "@/types/modules/product";
import Loading from "@/components/loader/loader";

interface DetailProps {
  id: number;
  onProductLoadSuccess?: (p: ProductConfType) => void;
}

export default function ProductDetail({ id, onProductLoadSuccess }: DetailProps) {
  const { showModal, hideModal }: any = useContext(ModalContext);
  const theme = useTheme();

  const { data, error, isLoading, mutate } = useDetailSwr(id && id > 0 ? id : 0);

  useEffect(
    function () {
      if (onProductLoadSuccess) {
        onProductLoadSuccess(data);
      }
    },
    [data, error, onProductLoadSuccess],
  );

  function onEditComplete() {
    hideModal();
    mutate();
  }

  function onEditClick() {
    showModal("Edit ProductConf", <ProductConfEdit id={data.id} onComplete={onEditComplete} />);
  }
  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {isLoading && <Loading />}

      {data && (
        <>
          <Card sx={{ mb: 2, maxWidth: "100%", width: "500px" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={{ px: theme.spacing(2), py: theme.spacing(1) }}>
                <Typography variant="h4">Config Detail</Typography>
                <IconButton size="large" onClick={onEditClick}>
                  <EditIcon />
                </IconButton>
              </Stack>
              <TableContainer>
                <Table sx={{ width: "100%" }}>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>Name</TableCell>
                      <TableCell>{data.name}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Description</TableCell>
                      <TableCell>{data.description}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Service Type</TableCell>
                      <TableCell>{data.serviceType}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Number Check</TableCell>
                      <TableCell>{data.numberCheck ? "true" : "false"}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Is Deleted</TableCell>
                      <TableCell>{data.isDeleted ? "true" : "false"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
