"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import ProductEdit from "./edit";
import ProductEditTranslate from "./editTranslate";
import { ProductType, ProductTranslateType } from "@/types/modules/product";
import SettingsIcon from "@mui/icons-material/Settings";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ButtonSwitch from "@/components/button/ButtonSwitch";
import { formatNumber } from "@/lib/util/number";
import { locales, LocaleInfoType } from "@/config/config";
import { fsUrl } from "@/lib/util/file_server";
import { useDetailSwr } from "./api";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductDelete from "./delete";

interface DetailProps {
  id: number;
  onProductLoadSuccess?: (p: ProductType) => void;
}

export default function ProductDetail({ id, onProductLoadSuccess }: DetailProps) {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal, hideModal } = modalContext;
  const theme = useTheme();

  const [activeLocale, setActiveLocale] = useState<string>("mn");
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
  const { data, error, isLoading, mutate } = useDetailSwr(id && id > 0 ? id : 0);

  useEffect(
    function () {
      if (onProductLoadSuccess) {
        onProductLoadSuccess(data);
      }
      setProductDetail(data);
    },
    [data, error, onProductLoadSuccess],
  );

  function onEditComplete() {
    hideModal();
    mutate();
  }

  function btnDeleteClick(entity: ProductType) {
    showModal(
      `Delete Pattern /${entity.name}/`,
      <ProductDelete
        id={entity.id}
        productDetail={entity}
        onComplete={() => {
          console.log("deleted");
          hideModal();
          mutate();
        }}
      />,
      "md",
    );
  }

  function onEditClick() {
    if (productDetail) {
      showModal("Edit Product", <ProductEdit id={productDetail.id} onComplete={onEditComplete} />, "md");
    }
  }

  function onEditClick1() {
    if (productDetail) {
      showModal("Edit Translate", <ProductEditTranslate locale={activeLocale} id={productDetail.id} onComplete={onEditComplete} />, "md");
    }
  }

  function getTranslate(): ProductTranslateType {
    let result: ProductTranslateType = {
      productId: productDetail ? productDetail.id : 0,
      lang: activeLocale,
      name: "_",
      description: "_",
    };

    if (productDetail && productDetail.translates) {
      for (const translate of productDetail.translates) {
        if (translate.lang == activeLocale) {
          result = translate;
          break;
        }
      }
    }

    return result;
  }

  function getThumbUrl(): string {
    const urlImageBlank = "/image/image_blank.jpg";

    if (!productDetail) {
      return urlImageBlank;
    }

    let url = null;
    // thumbImage?.filePath ? fsUrl(thumbImage?.filePath);
    if (productDetail.images) {
      for (const prodImage of productDetail.images) {
        if (prodImage.imageType == "thumb") {
          url = fsUrl(prodImage.filePath);
          break;
        }
      }
    }

    if (typeof url == "string") {
      return url;
    }

    return urlImageBlank;
  }

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {isLoading && <Typography variant={"h4"}>Loading...</Typography>}

      {productDetail && (
        <>
          <Card sx={{ display: "flex", mb: 2, flexDirection: "row", flexWrap: "wrap" }}>
            <CardMedia component="img" image={getThumbUrl()} alt={productDetail?.name} sx={{ width: 300, objectFit: "contain" }} />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 350,
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Grid container spacing={2}>
                  <Grid item lg={8} md={8} sm={12}>
                    <Box sx={{ position: "relative", pr: 6, mb: 2, maxWidth: "100%", width: "500px" }}>
                      <Typography component="h5" variant="h6" sx={{ mb: 2 }}>
                        {getTranslate().name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="div" sx={{ mb: 2 }}>
                        {getTranslate().description}
                      </Typography>

                      <Tooltip title="Орчуулгыг засах" placement="top-end">
                        <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={onEditClick1}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <ButtonGroup aria-label="Disabled elevation buttons">
                        {locales.map(function (localeInfo: LocaleInfoType) {
                          return (
                            <Button
                              variant={`${activeLocale == localeInfo.locale ? "contained" : "outlined"}`}
                              size="small"
                              color="primary"
                              onClick={function () {
                                setActiveLocale(localeInfo.locale);
                              }}
                              key={`btn_locale_${localeInfo.locale}`}
                            >
                              {localeInfo.locale}
                            </Button>
                          );
                        })}
                      </ButtonGroup>
                    </Box>

                    <Typography variant="h6" color="text.primary" component="div" sx={{ mb: 2 }}>
                      {productDetail.price && productDetail.price > 0 ? <>{`₮ ${formatNumber(productDetail.price)}`}</> : <>Төлбөр</>}
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12}>
                    <Stack direction="row" justifyContent="flex-end" flexWrap="wrap">
                      <ButtonSwitch disabled={true} checked={productDetail.enabled} />
                    </Stack>

                    <Stack direction="column">
                      {productDetail.productConf && (
                        <Tooltip title="ProductConfig" placement="left">
                          <Link href={`/product/conf/${productDetail.productConf.id}/detail`}>
                            <Button variant="text" size="small" startIcon={<SettingsIcon />}>
                              {productDetail.productConf.name}
                            </Button>
                          </Link>
                        </Tooltip>
                      )}

                      {productDetail.productCompletion && (
                        <Tooltip title="ProductCompletion" placement="left">
                          <Link href={`/product/completion/${productDetail.productCompletion.id}/detail`}>
                            <Button variant="text" size="small" startIcon={<ChecklistRtlIcon />}>
                              {productDetail.productCompletion.name}
                            </Button>
                          </Link>
                        </Tooltip>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions>
                <Tooltip title="Бүтээгдэхүүний мэдээлэл засах" placement="top-end">
                  <Link href={`/product/${id}/edit`}>
                    <Button variant="text" size="small" color="warning">
                      <EditIcon />
                    </Button>
                  </Link>
                </Tooltip>
                <Button
                  variant="text"
                  size="small"
                  color="inherit"
                  sx={{ ml: theme.spacing(0) }}
                  onClick={() => {
                    btnDeleteClick(productDetail);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Box>
          </Card>
        </>
      )}
    </Box>
  );
}
