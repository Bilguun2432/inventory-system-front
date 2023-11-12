import React from "react";
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

export default function TransactionInvoiceSearch(props: SearchProps) {
  const theme = useTheme();
  const [showModal, setShowModal] = React.useState(false);
  const [sendData, setSendData] = React.useState<any>();
  const { trigger: triggerUpdate } = useSearchSwr();

  const sendAllData = {
    filter: {
      state: sendData?.state,
      transactionId: sendData?.transactionId,
      paymentChannel: sendData?.paymentChannel,
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
    state: yup.string(),
    transactionId: yup.number().notRequired().nullable(),
    paymentChannel: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      transactionId: null,
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

  React.useEffect(() => {
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
              state: "",
              transactionId: null,
              paymentChannel: "",
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
              <Box sx={{ mb: theme.spacing(4), width: "570px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    statePayment
                  </InputLabel>
                  <Select
                    label={"statePayment"}
                    {...register("state")}
                    defaultValue={""}
                    fullWidth
                    size="medium"
                    error={errors.state ? true : false}
                  >
                    <MenuItem value={"NOT_PAID"}>NOT_PAID</MenuItem>
                    <MenuItem value={"PAID"}>PAID</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"transactionId"}
                  {...register("transactionId")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.transactionId ? true : false}
                  helperText={errors.transactionId?.message}
                />
              </Box>

              <Box sx={{ mb: theme.spacing(4) }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    paymentChannel
                  </InputLabel>
                  <Select
                    label={"paymentChannel"}
                    {...register("paymentChannel")}
                    defaultValue={""}
                    fullWidth
                    size="medium"
                    error={errors.paymentChannel ? true : false}
                  >
                    <MenuItem value={"STATE"}>STATE</MenuItem>
                    <MenuItem value={"GOLOMT"}>GOLOMT</MenuItem>
                    <MenuItem value={"XAC"}>XAC</MenuItem>
                    <MenuItem value={"KHAN"}>KHAN</MenuItem>
                    <MenuItem value={"QPAY"}>QPAY</MenuItem>
                  </Select>
                </FormControl>
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
