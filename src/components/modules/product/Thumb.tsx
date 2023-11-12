"use client";

import dayjs from "dayjs";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";

import Link from "next/link";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ButtonSwitch from "@/components/button/ButtonSwitch";
import Typography from "@mui/material/Typography";
import { formatNumber } from "@/lib/util/number";
import { fsUrl } from "@/lib/util/file_server";
import { ProductType } from "@/types/modules/product";
import SettingsIcon from "@mui/icons-material/Settings";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useContext, useEffect, useState } from "react";
import { useListSwr } from "./api";

const styleLineClamp = {
  fontWeight: "500",
  minHeight: "80px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": 2, // Adjust the number of lines you want to display
  "-webkit-box-orient": "vertical",
};

export default function Thumb({ product }: { product: ProductType }) {
  function getThumbUrl(): string {
    const urlImageBlank = "/image/image_blank.jpg";

    if (!product) {
      return urlImageBlank;
    }

    let url = null;
    // thumbImage?.filePath ? fsUrl(thumbImage?.filePath);
    if (product.images) {
      for (const prodImage of product.images) {
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
    <Card sx={{ mb: 1 }}>
      <CardMedia component="img" height="140" image={getThumbUrl()} alt={product.name} />
      <CardContent>
        <Typography variant="body1" component="h4" sx={styleLineClamp}>
          {product.name}
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <Box>
            {product.productConf && (
              <Tooltip title="ProductConfig" placement="top-start">
                <Link href={`/product/conf/${product.productConf.id}/detail`}>
                  <Button variant="text" size="small" startIcon={<SettingsIcon />}>
                    {product.productConf.name}
                  </Button>
                </Link>
              </Tooltip>
            )}
          </Box>

          <Typography variant="body1" component="p" sx={{ fontWeight: 500 }}>
            {product.price && product.price > 0 ? <>{`₮ ${formatNumber(product.price)}`}</> : <>Төлбөр</>}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ButtonSwitch disabled={true} checked={product.enabled} />
        <Link href={`/product/${product.id}/detail`}>
          <Button variant="text" size="small">
            Дэлгэрэнгүй
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
