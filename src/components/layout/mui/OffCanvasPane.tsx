"use client";

import { ReactNode, MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

interface OffCanvasProps extends BoxProps {
  open: boolean;
}

interface OffCanvasPaneProps extends OffCanvasProps {
  onClose: () => void;
  children: ReactNode;
}

const canvasWidth = 500;

const OffCanvasContainer = styled(Box, {
  shouldForwardProp: (prop: string) => {
    return !["open"].includes(prop);
  },
})<OffCanvasProps>(({ theme, open }) => ({
  display: "block",
  position: "fixed",
  top: "100vh",
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  zIndex: 50,

  ...(open && {
    top: 0,
  }),

  "& .off_canvas": {
    display: "block",
    position: "fixed",
    width: `${canvasWidth}px`,
    maxWidth: "90vw",
    height: "90vh",
    bottom: 0,
    right: `-${canvasWidth}px`,
    overflowX: "hidden",
    overflowY: "auto",
    transition: theme.transitions.create(["right"], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open && {
      right: 0,
      transition: theme.transitions.create(["right"], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}));

export default function OffCanvasPane({ open, children, onClose }: OffCanvasPaneProps) {
  function onContainerClick(event: MouseEvent<HTMLDivElement>) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains("_off_canvas_container")) {
      if (onClose) {
        onClose();
      }
    }
  }

  return (
    <OffCanvasContainer open={open} onClick={onContainerClick} className={"_off_canvas_container"}>
      <Card className="off_canvas">
        <CardContent>{children}</CardContent>
      </Card>
    </OffCanvasContainer>
  );
}
