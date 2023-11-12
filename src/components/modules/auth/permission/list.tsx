"use client";
import { AuthPermissionType } from "@/types/modules/auth_permission";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { useState, useEffect, MouseEvent, ChangeEvent, useContext } from "react";
import TablePagination from "@mui/material/TablePagination";
import { authPermissionAPI } from "./api";
import Stack from "@mui/material/Stack";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { PaginationModelType, SortModelType } from "@/types/modules/common";
import { useTheme } from "@mui/material/styles";
import { AxiosError, AxiosResponse } from "axios";
import AuthPermissionNew from "./new";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import OffCanvasPane from "@/components/layout/mui/OffCanvasPane";
import Typography from "@mui/material/Typography";
import FormFilter from "./FormFilter";
import AuthPermissionForm from "@/components/modules/auth/permission/form";

export interface AuthPermissionPaginationModelType extends PaginationModelType {
  items?: AuthPermissionType[];
}

export interface AuthPermissionFilterModelType {
  name?: string;
  permissionKey?: string;
  group_name?: string;
  description?: string;
}

export interface AuthPermissionListRequestType {
  filter: AuthPermissionFilterModelType;
  sort: SortModelType;
  pagination: AuthPermissionPaginationModelType;
}

export interface AuthPermissionsPagedType {
  page: number;
  size: number;
  totalItems: number;
  items: AuthPermissionType[];
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

interface AuthPermissionProps {
  onModalEdit?: (authPermission: AuthPermissionType) => void;
}

export default function AuthPermissionList(props: AuthPermissionProps) {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

  const [listReq, setListReq] = useState<AuthPermissionListRequestType>(initialListRequest);
  const [authPermissionsPaged, setAuthPermissionsPaged] = useState<AuthPermissionsPagedType | null>(null);

  const { onModalEdit } = props;
  const theme = useTheme();

  async function onMutateComplete() {
    authPermissionAPI
      .listFilter(listReq)
      .then(function (response: AxiosResponse) {
        const { status, data } = response;
        if (status == 200) {
          setAuthPermissionsPaged(data);
        }
      })
      .catch(function (error: AxiosError) {
        console.error(error.message);
      });
    hideModal();
  }

  function createNewClick() {
    showModal("Create new AuthPermission", <AuthPermissionNew onComplete={onMutateComplete} />, "md");
  }

  function btnEditClick(authPermission: AuthPermissionType) {
    showModal(`Edit AuthPermission /${authPermission.name}/`, <AuthPermissionForm authPermission={authPermission} onComplete={onMutateComplete} />, "md");
  }

  function onFilterFormClose() {
    setShowFilterForm(false);
  }

  useEffect(
    function () {
      authPermissionAPI
        .listFilter(listReq)
        .then(function (response: AxiosResponse) {
          const { status, data } = response;
          if (status == 200) {
            setAuthPermissionsPaged(data);
          }
        })
        .catch(function (error: AxiosError) {
          console.error(error.message);
        });
    },
    [listReq],
  );

  function onFilterSubmit(filterData: AuthPermissionFilterModelType) {
    const paging = {
      page: 0,
      size: listReq.pagination.size,
    };

    const newListReq = { ...listReq, filter: filterData, pagination: paging };
    setListReq(newListReq);
  }

  function getItems(): AuthPermissionType[] {
    if (!(authPermissionsPaged && authPermissionsPaged.items)) {
      return [];
    }
    return authPermissionsPaged.items;
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log({ newPage });
    if (!authPermissionsPaged) {
      return;
    }

    const paging = {
      page: newPage,
      size: authPermissionsPaged.size,
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
            <Button variant="outlined" size="small" color="secondary" onClick={createNewClick} sx={{ ml: theme.spacing(1) }}>
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
                <TableCell>Нэр</TableCell>
                <TableCell>Permission_key</TableCell>
                <TableCell>Group_name</TableCell>
                <TableCell>Тайлбар</TableCell>
                <TableCell>&nbsp;&nbsp;&nbsp;Засах</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getItems().map(function (authPermission: AuthPermissionType) {
                return (
                  <TableRow key={`authPermission${authPermission.id}`}>
                    <TableCell className="p-1 border border-slate-300 text-center font-bold">{authPermission.id}</TableCell>
                    <TableCell>{authPermission.name}</TableCell>
                    <TableCell>{authPermission.permissionKey}</TableCell>
                    <TableCell>{authPermission.group_name}</TableCell>
                    <TableCell>{authPermission.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        onClick={() => {
                          btnEditClick(authPermission);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <OffCanvasPane open={showFilterForm} onClose={onFilterFormClose}>
        <Typography>AuthPermission Filter Form</Typography>
        <FormFilter onFilterSubmit={onFilterSubmit} />
      </OffCanvasPane>

      <Grid container sx={{ mb: 2 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          {authPermissionsPaged && (
            <TablePagination
              component="div"
              count={authPermissionsPaged.totalItems}
              page={authPermissionsPaged.page}
              rowsPerPage={authPermissionsPaged.size}
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
