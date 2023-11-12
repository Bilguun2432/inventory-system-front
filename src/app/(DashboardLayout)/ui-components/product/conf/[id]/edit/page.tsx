"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import ProductConfForm from "@/components/modules/product/conf/form";

export default function ProductConfEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit AuthRole
      </Typography>
      <ProductConfForm
        onComplete={() => {
          router.push("/product/conf");
        }}
      />
    </>
  );
}
