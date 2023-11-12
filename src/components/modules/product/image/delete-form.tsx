"use client";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useProductImageDeleteSwr } from "./api";

interface FormProps {
  imageId?: number | undefined | any;
  product?: number | undefined | any;
  onComplete?: () => void;
  hideModal?: () => void;
}

export default function DeleteForm(props: FormProps) {
  const theme = useTheme();
  const { imageId, product, onComplete, hideModal } = props;
  const { trigger: triggerDelete } = useProductImageDeleteSwr(product, imageId);

  const deleteImage = () => {
    triggerDelete();
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
        onClick={() => deleteImage()}
      >
        Yes
      </Button>
    </Box>
  );
}
