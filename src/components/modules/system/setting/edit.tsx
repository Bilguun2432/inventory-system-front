"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useDetailSwr } from "./api";
import SystemSettingForm from "./form";

interface EditProps {
  id: number;
  onComplete?: () => void;
}

export default function SystemSettingEdit(props: EditProps) {
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
        <SystemSettingForm systemSetting={data} onComplete={onUpdateComplete} />
      )}
    </Box>
  );
}
