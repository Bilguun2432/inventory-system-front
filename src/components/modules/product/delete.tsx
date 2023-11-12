"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr, useDeleteSwr } from "./api";
import Button from "@mui/material/Button";
import { ProductType } from "@/types/modules/product";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DeleteProps {
  id: number;
  productDetail: ProductType;
  onComplete?: () => void;
}

export default function ProductDelete(props: DeleteProps) {
  const theme = useTheme();
  const { id, productDetail, onComplete } = props;
  const { data, mutate } = useDetailSwr(id);
  const { trigger: triggerDelete } = useDeleteSwr(productDetail?.id ?? 0);
  const router = useRouter();

  async function onDeleteComplete() {
    await triggerDelete(data);
    if (onComplete) {
      onComplete();
      router.push("/product");
    }
  }

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      <>
        <p>Та устгахдаа итгэлтэй байна уу?</p>
        <Button variant="contained" color="primary" size="small" onClick={onDeleteComplete} sx={{ mt: theme.spacing(2) }}>
          Confirm Delete
        </Button>
      </>
    </Box>
  );
}
