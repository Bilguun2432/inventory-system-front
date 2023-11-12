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
import { authUserAPI } from "./api";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { AuthUserType } from "@/types/modules/auth_user";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useContext, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import AuthUserNew from "./new";
import { AxiosError, AxiosResponse } from "axios";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import Typography from "@mui/material/Typography";
import FormFilter from "./FormFilter";

export interface AuthUserPaginationModelType extends PaginationModelType {
  items?: AuthUserType[];
}

export interface AuthUserFilterModelType {
  firstname?: string;
  lastname?: string;
  userType?: string;
  email?: string;
  mobile?: number;
}

export interface AuthUserListRequestType {
  filter: AuthUserFilterModelType;
  sort: SortModelType;
  pagination: AuthUserPaginationModelType;
}

export interface AuthUsersPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: AuthUserType[];
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

export default function AuthUserList() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<AuthUserListRequestType>(initialListRequest);
  const [authUsersPaged, setAuthUsersPaged] = useState<AuthUsersPagedType | null>(null);

  const theme = useTheme();

  async function onMutateComplete() {
    authUserAPI
      .listFilter(listReq)
      .then(function (response: AxiosResponse) {
        const { status, data } = response;
        if (status == 200) {
          setAuthUsersPaged(data);
        }
      })
      .catch(function (error: AxiosError) {
        console.error(error.message);
      });
    hideModal();
  }

  function createNewClick() {
    showModal("Create new AuthUser", <AuthUserNew onComplete={onMutateComplete} />, "md");
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(
    function () {
      console.log("useCallback");

      authUserAPI
        .listFilter(listReq)
        .then(function (response: AxiosResponse) {
          const { status, data } = response;
          if (status == 200) {
            setAuthUsersPaged(data);
          }
        })
        .catch(function (error: AxiosError) {
          console.error(error.message);
        });
    },
    [listReq],
  );

  function onFilterSubmit(filterData: AuthUserFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): AuthUserType[] {
    if (!(authUsersPaged && authUsersPaged.items)) {
      return [];
    }
    return authUsersPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!authUsersPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: authUsersPaged.size,
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>firstname</TableCell>
                <TableCell>lastname</TableCell>
                <TableCell>email</TableCell>
                <TableCell>mobile</TableCell>
                <TableCell>userType</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getItems().map(function (authUser: AuthUserType) {
                return (
                  <TableRow key={`auth_user_row_${authUser.id}`}>
                    <TableCell className="p-1 border border-slate-300 text-center font-bold">{authUser.id}</TableCell>
                    <TableCell>{authUser.firstname}</TableCell>
                    <TableCell>{authUser.lastname}</TableCell>
                    <TableCell>{authUser.email}</TableCell>
                    <TableCell>{authUser.mobile}</TableCell>
                    <TableCell>{authUser.userType}</TableCell>
                    <TableCell>{dayjs(authUser.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell>
                      <Link href={`/auth/user/${authUser.id}/detail`}>
                        <IconButton size="medium">
                          <VisibilityIcon />
                        </IconButton>
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
        <Typography>AuthUser Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>

      <Grid container sx={{ mb: 2 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          {authUsersPaged && (
            <TablePagination
              component="div"
              count={authUsersPaged.totalItems}
              page={authUsersPaged.page}
              rowsPerPage={authUsersPaged.size}
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
