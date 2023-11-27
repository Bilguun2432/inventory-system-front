"use client";

import dayjs from "dayjs";
// import Link from "next/link";
import React, { useState, useEffect, MouseEvent, ChangeEvent, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import { useProductUnitSwr, productAPI } from "./api";
import TableContainer from "@mui/material/TableContainer";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ProductCompletionForm from "./form";
import { ProductType } from "@/types/modules/product";
import Grid from "@mui/material/Grid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useTheme } from "@mui/material/styles";
import ProductEdit from "./edit";
import Producttransfer from "./transfer";
import Stack from "@mui/material/Stack";
import ProductNewForm from "./new";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { AxiosError, AxiosResponse } from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import Typography from "@mui/material/Typography";
import FormFilter from "./FormFilter";
import TablePagination from "@mui/material/TablePagination";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

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

interface ListProps {
  id: any;
  onComplete?: () => void;
}

export default function ProductList(props: ListProps) {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<ProductListRequestType>(initialListRequest);
  const [productsPaged, setProductsPaged] = useState<ProductsPagedType | null>(null);

  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { id, onComplete } = props;
  const { data: unitData, mutate: mutate2 } = useProductUnitSwr(id);
  const theme = useTheme();

  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imagePath: any) => {
    setSelectedImage(imagePath);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  async function onUpdateComplete() {
    try {
      const response = await productAPI.listFilter(id, listReq);
      const { status, data } = response;
      if (status === 200) {
        setProductsPaged(data);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
    onComplete;
    mutate2();
    hideModal();
  }

  async function onAlertComplete() {
    setShowSuccessAlert(true);
  }

  function createNewClick() {
    showModal("Create new Product", <ProductNewForm id={id} onComplete={onUpdateComplete} />, "md");
  }

  function btnEditClick(product: ProductType) {
    showModal(`Edit Product /${product.name}/`, <ProductEdit product={product} onComplete={onUpdateComplete} />, "md");
  }

  function btnTransferClick(product: ProductType) {
    showModal(
      `Transfer Product /${product.name}/`,
      <Producttransfer product={product} setTransferComplete={onAlertComplete} onComplete={onUpdateComplete} />,
      "md",
    );
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(() => {
    productAPI
      .listFilter(id, listReq)
      .then((response: AxiosResponse) => {
        const { status, data } = response;
        if (status === 200) {
          setProductsPaged(data);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
      });
  }, [id, listReq]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccessAlert]);

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Амжилттай шилжүүллээ!
        </Alert>
      )}
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
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Бүтээгдэхүүн</div>
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
              <div style={{ paddingLeft: "20px", paddingBottom: "20px", fontSize: "12px" }}>Бүтээгдэхүүний тоо</div>
            </div>
            <AssignmentIcon style={{ fontSize: "75px", paddingRight: "10px" }} color="primary" />
          </Paper>
        </Grid>
      </Grid>
      <br></br>
      <br></br>

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

        <Grid item md={6}>
          <Stack direction={"row"} justifyContent={"end"}>
            <Button variant="outlined" size="small" onClick={createNewClick} sx={{ ml: theme.spacing(1) }}>
              New
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Нэр</TableCell>
              <TableCell>Дэлгэрэнгүй</TableCell>
              <TableCell>Үнэ</TableCell>
              <TableCell>Тоо</TableCell>
              <TableCell>Зураг</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;Үүсгэсэн огноо</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;Засах</TableCell>
              <TableCell>Шилжүүлэх</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getItems().map(function (product: ProductType) {
              return (
                <TableRow key={`completion_row_${product.id}`}>
                  <TableCell className="p-1 border border-slate-300 text-center font-bold">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>
                    <div>
                      <img
                        src={product.imagePath ? `${process.env.NEXT_PUBLIC_IMAGE}${product.imagePath}` : "/images/image_blank.jpg"}
                        alt={product.name}
                        style={{ height: "70px", cursor: "pointer" }}
                        onClick={() => handleImageClick(product.imagePath)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{dayjs(product.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                  <TableCell>
                    &nbsp;&nbsp;&nbsp;
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ ml: theme.spacing(0) }}
                        onClick={() => {
                          btnEditClick(product);
                        }}
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ ml: theme.spacing(0) }}
                        onClick={() => {
                          btnTransferClick(product);
                        }}
                      >
                        <TransferWithinAStationIcon color="primary" style={{ fontSize: "23px" }} />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
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

      <Dialog open={openImageModal} onClose={handleCloseImageModal}>
        <DialogContent>
          <img
            src={selectedImage ? `${process.env.NEXT_PUBLIC_IMAGE}${selectedImage}` : "/images/image_blank.jpg"}
            alt="Large Image"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
