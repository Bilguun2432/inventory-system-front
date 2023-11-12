"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import ProductForm from "@/components/modules/product/form";

export default function ProductCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New Product
      </Typography>
      <ProductForm
        onComplete={() => {
          router.push("/product");
        }}
      />
    </>
  );
}
