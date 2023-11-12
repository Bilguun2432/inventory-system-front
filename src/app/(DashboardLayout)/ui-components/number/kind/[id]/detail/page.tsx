"use client";

import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import React from "react";
import NumberKindDetailList from "@/components/modules/number/kind/detail/detail/list";
import NumberKindPatternDetailList from "@/components/modules/number/kind/detail/pattern/detail/list";
import { useParams } from "next/navigation";
import NumberKindEdit from "@/components/modules/number/kind/edit";
import { NumberKindType } from "@/types/modules/number";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import { useListSwr } from "@/components/modules/number/kind/api";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [
  { title: "Төрөл", url: "/number/kind" },
  { title: "Дэлгэрэнгүй" },
];

export default function NumberKindDetailPage() {
  const theme = useTheme();
  const { id } = useParams();
  const { mutate } = useListSwr();
  const { showModal, hideModal }: any = useContext(ModalContext);
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  function onModalEdit(numberKindType: NumberKindType) {
    showModal(
      `Edit NumberKind /${numberKindType.name}/`,
      <NumberKindEdit id={numberKindType.id} onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <PageHeader pageTitle="Төрөлийн дэлгэрэнгүй" pagePaths={pagePaths} />
      <Stack direction="row" sx={{ mb: theme.spacing(2) }}>
        <Link href={`/number/kind`}>
          <Button variant="outlined" size="small" color="info">
            <ArrowCircleLeftIcon />
          </Button>
        </Link>
      </Stack>
      <NumberKindDetailList onModalEdit={onModalEdit} id={id} />
      <br />
      <div>
        <Typography variant="h5" gutterBottom>
          Pattern
        </Typography>
        <NumberKindPatternDetailList id={id} />
      </div>
    </>
  );
}
