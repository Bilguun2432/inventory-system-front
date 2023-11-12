"use client";

import ClientForm from "@/components/modules/client/form";
import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

export default function ClientIdEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const editId = parseInt(typeof id == "string" ? id : "0");

  return (
    <>
      <Typography variant={"h5"} component={"h4"}>
        Edit ProductCategory
      </Typography>
      <ClientForm
        id={editId}
        onComplete={() => {
          router.push("/client");
        }}
      />
    </>
  );
}
