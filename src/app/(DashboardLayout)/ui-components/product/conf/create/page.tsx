"use client";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import ProductConfForm from "@/components/modules/product/conf/form";

export default function ProductConfCreatePage() {
  const router = useRouter();
  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Create New ProductConf
      </Typography>
      <ProductConfForm
        onComplete={() => {
          router.push("/product/conf");
        }}
      />
    </>
  );
}
