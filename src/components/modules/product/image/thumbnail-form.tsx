"use client";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useProductImageMakeThumbSwr } from "./api";

interface FormProps {
  productId: number;
  imageId: number;
  onComplete?: () => void;
  hideModal?: () => void;
}

export default function ThumbnailForm(props: FormProps) {
  const theme = useTheme();
  const { imageId, productId, onComplete, hideModal } = props;
  const { trigger: triggerMakeThumbnail } = useProductImageMakeThumbSwr(
    productId,
    imageId,
    "thumb",
  );

  const makeThumbnail = () => {
    triggerMakeThumbnail();
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Button
        onClick={hideModal}
        type={"submit"}
        variant="outlined"
        color="primary"
        size="medium"
      >
        No
      </Button>
      <Button
        sx={{ ml: theme.spacing(2) }}
        type={"submit"}
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => makeThumbnail()}
      >
        Yes
      </Button>
    </Box>
  );
}
