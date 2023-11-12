"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCreateContractSwr, useContractRequestSwr } from "./api";
import React, { Dispatch, SetStateAction } from "react";
import Typography from "@mui/material/Typography";

interface FormProps {
  hideModal?: (() => void) | undefined;
  showModal?: (() => void) | undefined;
  setHtmlData: Dispatch<SetStateAction<any>>;
}

export default function CreateContractForm(props: FormProps) {
  const theme = useTheme();
  const { hideModal, showModal, setHtmlData } = props;
  const [dataAll, setDataAll] = React.useState<any>();
  const [fields, setFields] = React.useState<any>();
  const [oldDatas, setOldDatas] = React.useState<any>();

  const { trigger: triggerCreate } = useCreateContractSwr();
  const { trigger: triggerRequest } = useContractRequestSwr();

  const validationSchema = yup.object({
    customer_number: yup.number().required(),
    customer_register_number: yup.string().required(),
    customer_email_address: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    const result = await triggerCreate(data);

    if (result && result?.data) {
      setDataAll(result);
      setFields(result.data.formFields);
      setOldDatas(result.model);
    }
    console.log("datatatat", result);
  };

  const onSubmitRequest = async (data: any) => {
    console.log(data);

    const htmlData = await triggerRequest(data);
    if (htmlData && !htmlData.error) {
      setHtmlData(htmlData);
    }
    if (hideModal && htmlData && !htmlData.error) {
      hideModal();
    } else {
      alert("input is not empty");
    }
  };

  return (
    <Box
      sx={{
        my: theme.spacing(2),
        height: "auto",
        overflow: "hidden",
        overflowY: "scroll",
        maxHeight: "50vh",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {dataAll ? (
        <form onSubmit={handleSubmit(onSubmitRequest)}>
          {Array.isArray(fields) &&
            fields?.map((data, index) => {
              return (
                <Box key={index + "ContainerDiv"} sx={{ marginTop: 5 }}>
                  <Typography>{data?.container_label}</Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridColumnGap: theme.spacing(2),
                      gridTemplateColumns: "1fr 1fr",
                      height: "auto",
                      padding: "0px 10px 0px 10px",
                    }}
                  >
                    {data.fields?.map((datas: any, index: any) => {
                      //   if (
                      //     datas?.fieldKey === "current_package" ||
                      //     datas?.fieldKey === "chosen_package"
                      //   ) {
                      //     return (
                      //       <Box
                      //         key={index + "z"}
                      //         sx={{
                      //           mt: theme.spacing(4),
                      //           mb: theme.spacing(2),
                      //         }}
                      //       >
                      //         <FormControl fullWidth>
                      //           <InputLabel id="name-label">
                      //             {datas.fieldLabel}
                      //           </InputLabel>
                      //           <Select
                      //             // value={personName}
                      //             {...register(datas.fieldKey)}
                      //             input={
                      //               <OutlinedInput label={datas.fieldLabel} />
                      //             }
                      //           >
                      //             {packageType.map((name, index) => (
                      //               <MenuItem
                      //                 key={name?.name + index}
                      //                 value={name?.value}
                      //               >
                      //                 {name?.name}
                      //               </MenuItem>
                      //             ))}
                      //           </Select>
                      //         </FormControl>
                      //       </Box>
                      //     );
                      //   } else {
                      return (
                        <Box
                          key={index + "indexKey"}
                          sx={{
                            mt: theme.spacing(4),
                            mb: theme.spacing(2),
                          }}
                          display={"flex"}
                        >
                          <TextField
                            label={datas?.fieldLabel}
                            {...register(datas.fieldKey)}
                            fullWidth
                            size="medium"
                            defaultValue={
                              oldDatas[datas.fieldKey] === undefined
                                ? ""
                                : oldDatas[datas.fieldKey]
                            }
                            disabled={oldDatas[datas.fieldKey] !== undefined}
                            error={errors.customer_number ? true : false}
                            helperText={errors.customer_number?.message}
                            type={datas.fieldType}
                            InputLabelProps={
                              datas.fieldType === "date" ? { shrink: true } : {}
                            }
                          />
                        </Box>
                      );
                      //   }
                    })}
                  </Box>
                </Box>
              );
            })}

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
              Save
            </Button>
          </Stack>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4), mt: theme.spacing(5) }}>
            <TextField
              label={"number"}
              {...register("customer_number")}
              fullWidth
              size="medium"
              defaultValue={oldDatas ? oldDatas?.customer_number : ""}
              error={errors.customer_number ? true : false}
              helperText={errors.customer_number?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"register"}
              {...register("customer_register_number")}
              fullWidth
              size="medium"
              defaultValue={oldDatas ? oldDatas?.customer_register_number : ""}
              error={errors.customer_register_number ? true : false}
              helperText={errors.customer_register_number?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label={"email"}
              {...register("customer_email_address")}
              fullWidth
              size="medium"
              defaultValue={oldDatas ? oldDatas?.customer_email_address : ""}
              error={errors.customer_email_address ? true : false}
              helperText={errors.customer_email_address?.message}
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
              Save
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
const packageType = [
  {
    value: "15000A",
    name: "15000 A",
  },
  {
    value: "15000B",
    name: "15000 B",
  },
  {
    value: "20000A",
    name: "20000 A",
  },
  {
    value: "20000B",
    name: "20000 B",
  },
  {
    value: "20000C",
    name: "20000 C",
  },
  {
    value: "20000D",
    name: "20000 D",
  },
  {
    value: "30000A",
    name: "30000 A",
  },
  {
    value: "30000B",
    name: "30000 B",
  },
  {
    value: "30000C",
    name: "30000 C",
  },
  {
    value: "40000",
    name: "40000",
  },
  {
    value: "60000",
    name: "60000",
  },
  {
    value: "100000",
    name: "100000",
  },
];
