"use client";

import Link from "next/link";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { SystemSettingType } from "@/types/modules/system_setting";
import { useListSwr } from "@/components/modules/client/kind/api";
import SystemSettingList from "@/components/modules/system/setting/list";
import SystemSettingForm from "@/components/modules/system/setting/form";
import CustomizedBreadcrumbs from "@/components/breadcrumbs/breadcrumb";
import SystemSettingNew from "@/components/modules/system/setting/new";
import SystemSettingEdit from "@/components/modules/system/setting/edit";
import PageHeader from "@/components/layout/mui/PageHeader";

const pagePaths = [{ title: "Систем" }];

export default function SystemSettingPage() {
  const theme = useTheme();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const { mutate } = useListSwr();
  // async function onMutateComplete() {
  //   hideModal();
  //   await mutate();
  // }

  // function createNewClick() {
  //   showModal(
  //     "Create new SystemSetting",
  //     <SystemSettingNew onComplete={onMutateComplete} />
  //   );
  // }

  // function onModalEdit(systemSettingType: SystemSettingType) {
  //   showModal(
  //     `Edit SystemSetting /${systemSettingType.settingKey}/`,
  //     <SystemSettingEdit
  //       id={systemSettingType.id}
  //       onComplete={onMutateComplete}
  //     />
  //   );
  // }
  return (
    <>
      <PageHeader
        pageTitle="Системийн тохиргоо жагсаалт"
        pagePaths={pagePaths}
      />
      {/* <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{ mb: theme.spacing(2) }}
      >
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={createNewClick}
          sx={{ ml: theme.spacing(1) }}
        >
          New
        </Button>
      </Stack> */}
      <SystemSettingList />
    </>
  );
}
