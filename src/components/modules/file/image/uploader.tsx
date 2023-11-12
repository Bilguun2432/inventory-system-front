"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FileImageThumb, { FileImageType } from "./thumb";
import { FileServiceIdAPI } from "../api";
import { AxiosError, AxiosResponse } from "axios";
import { FileType } from "@/types/modules/file";
import UploadIcon from "@mui/icons-material/Upload";

interface FileImageUploaderProps {
  serviceName: string;
  serviceId: number;
  onServerFileAdded?: (fileServer: FileType) => void;
  onComplete?: () => void;
}

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function FileImageUploader({
  serviceName,
  serviceId,
  onServerFileAdded,
  onComplete,
}: FileImageUploaderProps) {
  const [fileImages, setFileImages] = useState<FileImageType[]>([]);
  const [showDoneButton, setShowDoneButton] = useState<boolean>(false);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const newFileImages = [];
    if (event.target.files && event.target.files?.length > 0) {
      console.log(event.target.files);
      for (const f of event.target.files) {
        newFileImages.push({
          src: URL.createObjectURL(f),
          fileLocal: f,
          state: "selected",
        });
      }
      setFileImages(newFileImages);
    } else {
      return;
    }
  }

  useCallback(
    function () {
      let fileImage;
      let completed = true;
      for (const index in fileImages) {
        fileImage = fileImages[index];
        if (fileImage.state === "selected") {
          completed = false;
          break;
        }
      }
      if (!completed) {
        return false;
      }
    },
    [fileImages],
  );

  function setUploadSuccess(index: number, fileServer: FileType) {
    const newFileImages = [...fileImages];
    newFileImages[index].fileServer = fileServer;
    newFileImages[index].state = "upload";
    setFileImages(newFileImages);
    if (onServerFileAdded) {
      onServerFileAdded(fileServer);
    }
  }

  function setUploadError(index: number, error: string) {
    console.log("setUploadError", error);
    const newFileImages = [...fileImages];
    newFileImages[index].state = "error";
    setFileImages(newFileImages);
  }

  function onAddClick() {
    let fileImage;
    for (const index in fileImages) {
      console.log({ index });
      fileImage = fileImages[index];
      if (!fileImage.fileLocal) {
        continue;
      }

      if (fileImage.state != "selected") {
        continue;
      }

      FileServiceIdAPI.uploadImage(fileImage.fileLocal, serviceName, serviceId)
        .then(function (response: AxiosResponse<FileType>) {
          const { status, data } = response;
          if (status == 200) {
            setUploadSuccess(parseInt(index), data);
            setShowDoneButton(true);
          }
        })
        .catch(function (error: AxiosError) {
          const { response } = error;
          console.log(response);
          setUploadError(parseInt(index), "Upload Error");
        });
    }
  }

  function removeFileByIndex(index: number) {
    const newFileImages = [...fileImages];
    newFileImages.splice(index, 1);
    setFileImages(newFileImages);
  }

  function onButtonDoneClick() {
    setFileImages([]);
    if (onComplete) {
      setShowDoneButton(false);
      onComplete();
    }
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{ my: 2 }}
      >
        {showDoneButton && (
          <Button variant="outlined" onClick={onButtonDoneClick}>
            Done
          </Button>
        )}

        {fileImages.length > 0 && (
          <Button variant="outlined" color="primary" onClick={onAddClick}>
            Add
          </Button>
        )}

        {fileImages.length == 0 && (
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadIcon />}
          >
            Upload a file
            <VisuallyHiddenInput type="file" onChange={onFileChange} multiple />
          </Button>
        )}
      </Stack>

      <Grid container spacing={1}>
        {fileImages.length > 0 &&
          fileImages.map(function (fileImage: FileImageType, index: number) {
            return (
              <Grid
                item
                md={3}
                sm={6}
                xs={12}
                key={`selected_file_image_${index}`}
              >
                <FileImageThumb
                  {...fileImage}
                  onRemoveFile={() => {
                    removeFileByIndex(index);
                  }}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
