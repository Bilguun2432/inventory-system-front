"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr, useDeleteSwr } from "./api";
import Button from "@mui/material/Button";
import { NumberKindPatternType } from "@/types/modules/number";

interface DeleteProps {
  id: number;
  numberKindPattern: NumberKindPatternType;
  onComplete?: () => void;
}

export default function NumberKindPatternDelete(props: DeleteProps) {
  const theme = useTheme();
  const { id, numberKindPattern, onComplete } = props;
  const { data, mutate } = useDetailSwr(id);
  const { trigger: triggerDelete } = useDeleteSwr(numberKindPattern?.id ?? 0);

  console.log("dasavfwghvrjegnmrjkeg", data);

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
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onDeleteComplete}
          sx={{ mt: theme.spacing(2) }}
        >
          Confirm Delete
        </Button>
      </>
    </Box>
  );
}
