import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { ModalDialogProps } from "@/types/component";

interface ModalDialogWithHideProps extends ModalDialogProps {
  hideModal: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const sizesWidth = {
  sm: 400,
  md: 800,
  lg: 1200,
  xl: 1500,
};

export default function ModalDialog(props: ModalDialogWithHideProps) {
  const { title, content, visible, size, hideModal } = props;

  function getSizeWidth(): number {
    if (size === "sm") {
      return sizesWidth.sm;
    }

    if (size === "md") {
      return sizesWidth.md;
    }

    if (size === "lg") {
      return sizesWidth.lg;
    }

    if (size === "xl") {
      return sizesWidth.xl;
    }

    return sizesWidth.md;
  }

  return (
    <>
      <Modal open={visible} onClose={hideModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ ...style, width: getSizeWidth }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box>{content}</Box>
        </Box>
      </Modal>
    </>
  );
}
