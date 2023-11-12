import React, { useEffect } from "react";
import dayjs from "dayjs";
import * as yup from "yup";
import { useSearchSwr } from "./api";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface SearchProps {
  page: number;
  rowsPerPage: number;
  changeData: (data: any) => void;
  setPage: (data: any) => void;
}

export default function TransactionSearch(props: SearchProps) {
  const theme = useTheme();
  const [showModal, setShowModal] = React.useState(false);
  const [sendData, setSendData] = React.useState<any>({});
  const { trigger: triggerUpdate } = useSearchSwr();

  const sendAllData = {
    filter: {
      state: sendData.state,
      accNumber: sendData.accNumber,
      start_date: sendData.start_date
        ? dayjs(sendData.start_date).format("YYYY-MM-DD HH:mm:ss")
        : sendData.start_date,
      end_date: sendData.end_date
        ? dayjs(sendData.end_date).format("YYYY-MM-DD HH:mm:ss")
        : sendData.end_date,
    },
    sort: {
      field: "state",
      sortType: "asc",
    },
    pagination: {
      page: props.page,
      size: props.rowsPerPage,
    },
  };

  const validationSchema = yup.object({
    accNumber: yup.string(),
    state: yup.string(),
    start_date: yup.string().notRequired().nullable(),
    end_date: yup.string().notRequired().nullable(),
  });

  const current = new Date();
  const nowDate = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      start_date: nowDate,
      end_date: nowDate,
    },
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
      <ReplayIcon
        fontSize="large"
        onClick={() => {
          setSendData({
            filterModel: {
              accNumber: "",
              state: "",
              start_date: null,
              end_date: null,
            },
            sort: {
              field: "state",
              sortType: "asc",
            },
            pagination: {
              page: 0,
              size: props.rowsPerPage,
            },
          });
        }}
      />
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
                  label={"accNumber"}
                  {...register("accNumber")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.accNumber ? true : false}
                  helperText={errors.accNumber?.message}
                />
              </Box>

              <Box sx={{ mb: theme.spacing(4), width: "570px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">state</InputLabel>
                  <Select
                    label={"state"}
                    {...register("state")}
                    defaultValue={""}
                    fullWidth
                    size="medium"
                    error={errors.state ? true : false}
                  >
                    <MenuItem value={"NOT_FULFILLED	"}>NOT_FULFILLED </MenuItem>
                    <MenuItem value={"FULFILLED"}>FULFILLED</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"start_date"}
                  {...register("start_date")}
                  defaultValue={null}
                  fullWidth
                  size="medium"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={errors.start_date ? true : false}
                  helperText={errors.start_date?.message}
                />
              </Box>
              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"end_date"}
                  {...register("end_date")}
                  defaultValue={null}
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  size="medium"
                  error={errors.end_date ? true : false}
                  helperText={errors.end_date?.message}
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
