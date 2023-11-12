"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { numberPrefixAPI } from "./api";
import { NumberPrefixType } from "@/types/modules/number";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext, useState, useEffect } from "react";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { AxiosError, AxiosResponse } from "axios";
import NumberPrefixNew from "./new";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import Typography from "@mui/material/Typography";
import FormFilter from "./FormFilter";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import NumberPrefixDelete from "./delete";
import NumberPrefixForm from "@/components/modules/number/prefix/form";

export interface NumberPrefixPaginationModelType extends PaginationModelType {
  items?: NumberPrefixType[];
}

export interface NumberPrefixFilterModelType {
  mainService?: string;
  prefixValue?: string;
}

export interface NumberPrefixListRequestType {
  filter: NumberPrefixFilterModelType;
  sort: SortModelType;
  pagination: NumberPrefixPaginationModelType;
}

export interface NumberPrefixsPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: NumberPrefixType[];
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

export default function NumberPrefixList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<NumberPrefixListRequestType>(initialListRequest);
  const [numberPrefixsPaged, setNumberPrefixsPaged] = useState<NumberPrefixsPagedType | null>(null);

  const theme = useTheme();

  async function onMutateComplete() {
    numberPrefixAPI
      .listFilter(listReq)
      .then(function (response: AxiosResponse) {
        const { status, data } = response;
        if (status == 200) {
          setNumberPrefixsPaged(data);
        }
      })
      .catch(function (error: AxiosError) {
        console.error(error.message);
      });
    hideModal();
  }

  function btnDeleteClick(numberPrefix: NumberPrefixType) {
    showModal(
      `Delete Pattern /${numberPrefix.mainService}/`,
      <NumberPrefixDelete id={numberPrefix.id} numberPrefix={numberPrefix} onComplete={onMutateComplete} />,
      "md",
    );
  }

  function createNewClick() {
    showModal("Create new NumberPrefix", <NumberPrefixNew onComplete={onMutateComplete} />, "md");
  }

  function btnEditClick(numberPrefix: NumberPrefixType) {
    showModal(
      `Edit NumberPrefix /${numberPrefix.mainService}/`,
      <NumberPrefixForm id={numberPrefix.id} numberPrefix={numberPrefix} onComplete={onMutateComplete} />,
      "md",
    );
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(
    function () {
      numberPrefixAPI
        .listFilter(listReq)
        .then(function (response: AxiosResponse) {
          const { status, data } = response;
          if (status == 200) {
            setNumberPrefixsPaged(data);
          }
        })
        .catch(function (error: AxiosError) {
          console.error(error.message);
        });
    },
    [listReq],
  );

  function onFilterSubmit(filterData: NumberPrefixFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): NumberPrefixType[] {
    if (!(numberPrefixsPaged && numberPrefixsPaged.items)) {
      return [];
    }
    return numberPrefixsPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!numberPrefixsPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: numberPrefixsPaged.size,
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
          <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(2) }}>
            <Button variant="outlined" size="small" color="primary" onClick={createNewClick} sx={{ ml: theme.spacing(1) }}>
              New
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>MainService</TableCell>
                <TableCell>PrefixValue</TableCell>
                <TableCell>Идэвхтэй</TableCell>
                <TableCell>&nbsp;&nbsp;&nbsp;Засах</TableCell>
                <TableCell>Устгах</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getItems().map(function (numberPrefix: NumberPrefixType) {
                return (
                  <TableRow key={`numberPrefix${numberPrefix.id}`}>
                    <TableCell>{numberPrefix.id}</TableCell>
                    <TableCell>{numberPrefix.mainService}</TableCell>
                    <TableCell>{numberPrefix.prefixValue}</TableCell>
                    <TableCell>{numberPrefix.enabled ? "true" : "false"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        onClick={() => {
                          btnEditClick(numberPrefix);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="contained primary button group">
                        <Button
                          variant="text"
                          size="small"
                          color="warning"
                          sx={{ ml: theme.spacing(0) }}
                          onClick={() => {
                            btnDeleteClick(numberPrefix);
                          }}
                        >
                          <DeleteIcon />
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
        <Typography>NumberPrefix Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>

      <Grid container sx={{ mb: 2 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          {numberPrefixsPaged && (
            <TablePagination
              component="div"
              count={numberPrefixsPaged.totalItems}
              page={numberPrefixsPaged.page}
              rowsPerPage={numberPrefixsPaged.size}
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
