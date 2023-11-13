"use client";

import Link from "next/link";
import React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CategoryList from "@/components/modules/product/category/detail/list";
import { useDetailSwr } from "@/components/modules/product/category/detail/api";
import TranslationList from "@/components/modules/product/category/translateList/list";
import TranslationForm from "@/components/modules/product/category/translateList/form";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Ангилал", url: "/product/category" }, { title: "Дэлгэрэнгүй" }];

export default function ProductCategoryDetail() {
  const theme = useTheme();
  const { id } = useParams();
  const { data, mutate } = useDetailSwr(id);
  const { showModal, hideModal }: any = useContext(ModalContext);

  async function onMutateComplete() {
    await mutate();
    hideModal();
  }

  function createNewClick() {
    showModal("Create new ProductCategory Translate English", <TranslationForm onComplete={onMutateComplete} id2={id} locale={""} />);
  }

  return (
    <>
      <PageHeader pageTitle="Ангилалын дэлгэрэнгүй" pagePaths={pagePaths} />
      <Stack direction="row" sx={{ mb: theme.spacing(2) }}>
        <Link href={`/product/category`}>
          <Button variant="outlined" size="small" color="info">
            <ArrowCircleLeftIcon />
          </Button>
        </Link>
      </Stack>
      <CategoryList id={id} onComplete={onMutateComplete} />
      <Box sx={{ mb: theme.spacing(2) }}>
        <Typography variant="h5" sx={{ marginTop: 5 }}>
          Translation
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {data &&
          data.translates &&
          // data.translates.map((translateData: object | any, index: number) => {
          data.translates.map((translateData: object | any) => {
            {
              return (
                <Box
                  key={translateData.name + "whoKnow"}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TranslationList id={id} data={translateData} />
                  {data?.translates.length >= 2 ? (
                    <></>
                  ) : (
                    <Stack direction={"row"} alignItems={"center"} sx={{ ml: theme.spacing(30) }}>
                      <Button variant="outlined" size="small" color="secondary" onClick={createNewClick} sx={{ ml: theme.spacing(1) }}>
                        {"Translate English create"}
                      </Button>
                    </Stack>
                  )}
                </Box>
              );
            }
          })}
      </Box>
    </>
  );
}
