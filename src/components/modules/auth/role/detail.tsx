"use client";

import { useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ModalContext } from "@/components/layout/mui/ModalProvider";

import { useDetailSwr } from "./api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import AuthRoleEdit from "./edit";
import { AuthRoleType } from "@/types/modules/auth_role";
import Loading from "@/components/loader/loader";

interface DetailProps {
  id: number;
  onProductLoadSuccess?: (p: AuthRoleType) => void;
}

export default function ProductDetail({
  id,
  onProductLoadSuccess,
}: DetailProps) {
  const { showModal, hideModal }: any = useContext(ModalContext);
  const theme = useTheme();

  const { data, error, isLoading, mutate } = useDetailSwr(
    id && id > 0 ? id : 0,
  );

  useEffect(
    function () {
      if (onProductLoadSuccess) {
        console.log("role=>", data);
        onProductLoadSuccess(data);
      }
    },
    [data, error],
  );

  function onEditComplete() {
    hideModal();
    mutate();
  }

  function onEditClick() {
    showModal(
      "Edit AuthRole",
      <AuthRoleEdit id={data.id} onComplete={onEditComplete} />,
    );
  }
  console.log("data  .", data);
  return (
    <Box
      sx={{
        my: theme.spacing(2),
      }}
    >
      {isLoading && <Loading />}
      {data && (
        <>
          <Card
            sx={{
              display: "flex",
              mb: theme.spacing(2),
              borderRadius: "30px",
            }}
          >
            {/* <CardMedia
              component="img"
              sx={{ width: 300 }}
              image="/image/image_profile.jpg"
              alt="Live from space album cover"
            /> */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", paddingLeft: "30px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography component="h4" variant="h5">
                    {`Name: ${data.name}`}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    sx={{ px: theme.spacing(2), py: theme.spacing(1) }}
                  >
                    <IconButton size="large" onClick={onEditClick}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </div>
                <Typography component="h4" variant="h5">
                  {`Description: ${data.description}`}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </>
      )}
    </Box>
  );
}
