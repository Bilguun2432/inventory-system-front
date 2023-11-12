"use client";

import { useContext } from "react";
import ProductCategoryList from "@/components/modules/product/category/list";
import ProductCategoryForm from "@/components/modules/product/category/detail/form";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { ProductCategoryType } from "@/types/modules/product";
import { useListSwr } from "@/components/modules/product/category/api";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Ангилал" }];

export default function ProductCategoryPage() {
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();

  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function onModalEdit(productCategory: ProductCategoryType) {
    showModal(
      `Edit ProductCategory /${productCategory.name}/`,
      <ProductCategoryForm id={productCategory.id} productCategory={productCategory} onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Ангилалын жагсаалт" pagePaths={pagePaths} />
      <ProductCategoryList onModalEdit={onModalEdit} />
    </>
  );
}
