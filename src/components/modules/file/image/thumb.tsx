"use client";

import React, { useState, MouseEvent } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FileType } from "@/types/modules/file";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
export interface FileImageType {
  src?: string;
  fileLocal?: File;
  fileServer?: FileType;
  state?: string;
  error?: string;
}

export interface FileImageProps extends FileImageType {
  onRemoveFile?: () => void;
  makeThumbnail?: () => void;
}

const ImageBox = styled(Box)(({ theme }) => ({
  display: "block",
  position: "relative",
  border: "1px solid rgba(44, 44, 44, 0.1)",
  "&:before": {
    content: '""',
    display: "block",
    position: "relative",
    paddingBottom: "100%",
  },
  "& > img": {
    display: "block",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  "& > ._nav": {
    display: "block",
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  "& > ._state": {
    display: "block",
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    minHeight: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function FileImageThumb(props: FileImageProps) {
  const { src, fileLocal, fileServer, state, onRemoveFile, makeThumbnail } =
    props;

  const onBtnRemoveClick = (event: MouseEvent<HTMLElement>) => {
    if (onRemoveFile) {
      onRemoveFile();
    }
  };

  const onMakeThumbnailClick = (event: MouseEvent<HTMLElement>) => {
    if (makeThumbnail) {
      makeThumbnail();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ImageBox>
        <img src={src} />
        {state === "server" ? (
          <>
            <Box className={"_nav"}>
              <IconButton onClick={handleClick}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: "15ch",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <div
                    style={{ flexDirection: "row", display: "flex" }}
                    onClick={onMakeThumbnailClick}
                  >
                    <ListItemIcon>
                      <ImageIcon fontSize="medium" />
                    </ListItemIcon>
                    <div>Thumbnail</div>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div
                    style={{ flexDirection: "row", display: "flex" }}
                    onClick={onBtnRemoveClick}
                  >
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <div>Delete</div>
                  </div>
                </MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <>
            <Box className={"_nav"}>
              <IconButton onClick={onBtnRemoveClick}>
                <CloseIcon />
              </IconButton>
            </Box>
          </>
        )}
      </ImageBox>
    </>
  );
}
