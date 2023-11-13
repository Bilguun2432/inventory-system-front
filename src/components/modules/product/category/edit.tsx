"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import ProductCategoryForm from "./form";
import { ProductCategoryType } from "@/types/modules/product";

interface EditProps {
  productCategory: ProductCategoryType;
  onComplete?: () => void;
}

export default function ProductCategoryEdit(props: EditProps) {
  const theme = useTheme();
  const { productCategory, onComplete } = props;
  const { data, mutate } = useDetailSwr(productCategory.id);

  function onUpdateComplete() {
    if (onComplete) {
      mutate();
      onComplete();
    }
  }

  return <Box sx={{ my: theme.spacing(2) }}>{data && <ProductCategoryForm productCategory={data} onComplete={onUpdateComplete} />}</Box>;
}
