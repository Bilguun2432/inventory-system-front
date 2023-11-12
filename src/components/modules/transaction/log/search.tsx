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

interface SearchProps {
  page: number;
  rowsPerPage: number;
  changeData: (data: any) => void;
  setPage: (data: any) => void;
}

export default function TransactionLogSearch(props: SearchProps) {
  const theme = useTheme();
  const [showModal, setShowModal] = React.useState(false);
  const [sendData, setSendData] = React.useState<any>();
  const { trigger: triggerUpdate } = useSearchSwr();

  const sendAllData = {
    filter: {
      transactionProductId: sendData?.transactionProductId,
      transactionId: sendData?.transactionId,
      transactionInvoiceId: sendData?.transactionInvoiceId,
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
    transactionId: yup.number().notRequired().nullable(),
    transactionProductId: yup.number().notRequired().nullable(),
    transactionInvoiceId: yup.number().notRequired().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      transactionId: null,
      transactionProductId: null,
      transactionInvoiceId: null,
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
            filter: {
              transactionId: null,
              transactionProductId: null,
              transactionInvoiceId: null,
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
          <Box sx={{ mb: theme.spacing(2) }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  style={{ width: "570px" }}
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
                <TextField
                  label={"transactionProductId"}
                  {...register("transactionProductId")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.transactionProductId ? true : false}
                  helperText={errors.transactionProductId?.message}
                />
              </Box>

              <Box sx={{ mb: theme.spacing(4) }}>
                <TextField
                  label={"transactionInvoiceId"}
                  {...register("transactionInvoiceId")}
                  defaultValue={""}
                  fullWidth
                  size="medium"
                  error={errors.transactionInvoiceId ? true : false}
                  helperText={errors.transactionInvoiceId?.message}
                />
              </Box>

              <Stack direction={"row"} justifyContent={"end"} sx={{ mb: theme.spacing(4) }}>
                <Button type={"submit"} variant="outlined" color="primary" size="medium">
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
