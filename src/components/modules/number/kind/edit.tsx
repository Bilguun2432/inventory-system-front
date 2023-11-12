"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import NumberKindForm from "./form";

interface EditProps {
  id: number;
  onComplete?: () => void;
}

export default function NumberKindEdit(props: EditProps) {
  const theme = useTheme();
  const { id, onComplete } = props;
  const { data, mutate } = useDetailSwr(id);

  function onUpdateComplete() {
    if (onComplete) {
      mutate();
      onComplete();
    }
  }

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {data && (
        <NumberKindForm numberKind={data} onComplete={onUpdateComplete} />
      )}
    </Box>
  );
}
