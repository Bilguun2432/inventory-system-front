import React, { useEffect } from "react";
import dayjs from "dayjs";
import * as yup from "yup";
import { useSearchSwr } from "./api";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

interface SearchProps {
  page: number;
  rowsPerPage: number;
  changeData: (data: any) => void;
  setPage: (data: any) => void;
}

export default function ProductCategorySearch(props: SearchProps) {
  const theme = useTheme();
  const [showModal, setShowModal] = React.useState(false);
  const [sendData, setSendData] = React.useState<any>({});
  const { trigger: triggerUpdate } = useSearchSwr();

  const sendAllData = {
    filter: {
      name: sendData?.name,
      group_name: sendData?.group_name,
      permissionKey: sendData?.permissionKey,
      description: sendData?.description,
    },
    sort: {
      field: "name",
      sortType: "asc",
    },
    pagination: {
      page: props.page,
      size: props.rowsPerPage,
    },
  };

  const validationSchema = yup.object({
    name: yup.string(),
    group_name: yup.string(),
    permissionKey: yup.string(),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    props.setPage(0);
    setSendData(data);
  };

  const aFunction = async (data: any) => {
    const result = await triggerUpdate(data);
    props.changeData(result);
  };

  useEffect(() => {
    aFunction(sendAllData);
    setShowModal(false);
  }, [sendData, props.page, props.rowsPerPage]);

  return (
    <div style={{ marginBottom: "5px" }}>
      <SearchIcon fontSize="large" onClick={() => setShowModal(!showModal)} />

      <div
        onClick={() => setShowModal(!showModal)}
        style={{
          ...modalStyle,
          transform: showModal ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            ...modalContentStyle,
            transform: showModal ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <Box sx={{ my: theme.spacing(2) }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"Name"}
                  {...register("name")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                />
              </Box>

              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"PERMISSION_KEY"}
                  {...register("permissionKey")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.permissionKey ? true : false}
                  helperText={errors.permissionKey?.message}
                />
              </Box>

              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"GROUP NAME"}
                  {...register("group_name")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.group_name ? true : false}
                  helperText={errors.group_name?.message}
                />
              </Box>

              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"Description"}
                  {...register("description")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.description ? true : false}
                  helperText={errors.description?.message}
                />
              </Box>

              <Stack
                direction={"row"}
                justifyContent={"end"}
                sx={{ mb: theme.spacing(4) }}
              >
                <Button
                  type={"submit"}
                  variant="outlined"
                  color="primary"
                  size="medium"
                >
                  Search
                </Button>
              </Stack>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: 1,
  transition: "transform 1s ease",
};
const modalContentStyle: React.CSSProperties = {
  position: "fixed",
  backgroundColor: "white",
  width: "650px",
  height: "100%",
  right: "0px",
  top: "0px",
  paddingLeft: "40px",
  padding: "40px",
  transition: "transform 1s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
