"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr, useDeleteSwr } from "./api";
import Button from "@mui/material/Button";
import { NumberKindType } from "@/types/modules/number";

interface DeleteProps {
  id: number;
  numberKind: NumberKindType;
  onComplete?: () => void;
}

export default function NumberKindDelete(props: DeleteProps) {
  const theme = useTheme();
  const { id, numberKind, onComplete } = props;
  const { data, mutate } = useDetailSwr(id);
  const { trigger: triggerDelete } = useDeleteSwr(numberKind?.id ?? 0);

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
