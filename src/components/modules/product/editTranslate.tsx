"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailTranslateSwr } from "./api";
import ProductFormTranslate from "./formTranslate";

interface EditProps {
  id: number;
  locale: string;
  onComplete?: () => void;
}

export default function ProductEditTranslate(props: EditProps) {
  const theme = useTheme();
  const { id, locale, onComplete } = props;
  const { data: productDetailTranslate } = useDetailTranslateSwr(id, locale);
  useEffect(() => {
    console.log("data=>", productDetailTranslate);
  }, [productDetailTranslate]);
  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {productDetailTranslate && <ProductFormTranslate id={id} locale={locale} productTranslate={productDetailTranslate} onComplete={onComplete} />}
    </Box>
  );
}
