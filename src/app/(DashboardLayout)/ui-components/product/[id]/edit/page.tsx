"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import ProductForm from "@/components/modules/product/form";

export default function ProductEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit Product
      </Typography>
      <ProductForm
        id={editId}
        onComplete={() => {
          router.push("/product");
        }}
      />
    </>
  );
}
