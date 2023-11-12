"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductAttributeForm from "./form";
import { ProductType } from "@/types/modules/product";
import { propagateServerField } from "next/dist/server/lib/render-server";
import { ListProps } from "@mui/material";

interface EditProps {
  id: number;
  onComplete?: () => void;
}

export default function ProductAttributeEdit({
  product,
  ...props
}: EditProps & { product: ProductType }) {
  const theme = useTheme();
  const { id, onComplete } = props;
  const productWithId = product as ProductType & { id: number };
  const { data, mutate } = useDetailSwr(productWithId.id, id);

  function onUpdateComplete() {
    if (onComplete) {
      mutate();
      onComplete();
    }
  }

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {data && (
        <ProductAttributeForm
          productAttribute={data}
          product={product}
          onComplete={onUpdateComplete}
        />
      )}
    </Box>
  );
}
