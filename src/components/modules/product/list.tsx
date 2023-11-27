"use client";

import { useState, useContext, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { ProductType } from "@/types/modules/product";
import ProductSelect from "./select";
import FormFilter from "./FormFilter";
import { productAPI } from "./api";
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
import ProductEdit from "./edit";
import Producttransfer from "./transfer";
import { fsUrl } from "@/lib/util/file_server";
import { useImageSwr } from "./image";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

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

export default function ProductList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;

  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imagePath: any) => {
    setSelectedImage(imagePath);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

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
    showModal("Create new Product", <ProductSelect onComplete={onMutateComplete} />, "md");
  }

  function btnEditClick(product: ProductType) {
    showModal(`Edit Product /${product.name}/`, <ProductEdit product={product} onComplete={onMutateComplete} />, "md");
  }

  function btnTransferClick(product: ProductType) {
    showModal(`Transfer Product /${product.name}/`, <Producttransfer product={product} onComplete={onMutateComplete} />, "md");
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
              <TableCell>Ангилал</TableCell>
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
                  <TableCell>{product.category.name}</TableCell>
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
