"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr, useDeleteSwr } from "./api";
import Button from "@mui/material/Button";
import { ProductCompletionType } from "@/types/modules/product";

interface DeleteProps {
  id: number;
  productCompletion: ProductCompletionType;
  onComplete?: () => void;
}

export default function ProductCompletionDelete(props: DeleteProps) {
  const theme = useTheme();
  const { id, productCompletion, onComplete } = props;
  const { data, mutate } = useDetailSwr(id);
  const { trigger: triggerDelete } = useDeleteSwr(productCompletion?.id ?? 0);

  console.log("hi", data);

  async function onDeleteComplete() {
    await triggerDelete(data);
    console.log("conf delete");
    if (onComplete) {
      onComplete();
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
