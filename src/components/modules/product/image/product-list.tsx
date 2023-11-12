"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import { fsUrl } from "@/lib/util/file_server";
import { FileType } from "@/types/modules/file";
import { AxiosError, AxiosResponse } from "axios";
import FileImageUploader from "@/components/modules/file/image/uploader";
import { ProductImageType, ProductType } from "@/types/modules/product";
import { useProductImageListSwr, useProductImageAddSwr } from "./api";
import FileImageThumb from "@/components/modules/file/image/thumb";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ThumbnailForm from "./thumbnail-form";
import DeleteForm from "./delete-form";

export default function TitlebarImageList({
  product,
}: {
  product: ProductType;
}) {
  const { data: productImages, mutate } = useProductImageListSwr(product.id);
  const { trigger: triggerAdd } = useProductImageAddSwr(product.id);
  const { showModal, hideModal }: any = React.useContext(ModalContext);

  function btnDelete(imageId: number) {
    showModal(
      `Are you sure you want to delete it?`,
      <DeleteForm
        imageId={imageId}
        product={product.id}
        onComplete={onFileUploadComplete}
        hideModal={hideModal}
      />,
    );
  }

  function btnMakeThumbnail(imageId: number) {
    showModal(
      `Are you sure you make to thumbnail it?`,
      <ThumbnailForm
        imageId={imageId}
        productId={product.id}
        onComplete={onFileUploadComplete}
        hideModal={hideModal}
      />,
    );
  }

  function onFileUploadSuccess(fileServer: FileType) {
    const idModel: any = { id: fileServer.id ?? 0 };
    triggerAdd(idModel)
      .then(function (response: AxiosResponse) {
        console.log("amjilttai");
        console.log({ response });
      })
      .catch(function (error: AxiosError) {
        console.log("errorrrrrr");
        console.log({ error });
      });
  }

  async function onFileUploadComplete() {
    await mutate();
    await hideModal();
  }

  return (
    <>
      <FileImageUploader
        serviceName={"product"}
        serviceId={product.id}
        onServerFileAdded={onFileUploadSuccess}
        onComplete={onFileUploadComplete}
      />
      <Grid container spacing={1}>
        {productImages &&
          productImages?.map(
            (productImage: ProductImageType, index: number) => {
              return (
                <Grid
                  item
                  md={3}
                  sm={6}
                  xs={12}
                  key={`product_image_${productImage.id}`}
                >
                  <FileImageThumb
                    src={fsUrl(productImage.filePath)}
                    state="server"
                    onRemoveFile={() => {
                      btnDelete(productImage.id);
                    }}
                    makeThumbnail={() => {
                      btnMakeThumbnail(productImage.id);
                    }}
                  />
                </Grid>
              );
            },
          )}
      </Grid>
    </>
  );
}
