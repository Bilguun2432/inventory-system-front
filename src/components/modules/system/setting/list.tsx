"use client";

import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { useListSwr } from "./api";
import dayjs from "dayjs";
import { SystemSettingType } from "@/types/modules/system_setting";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import SystemSettingNew from "@/components/modules/system/setting/new";
import SystemSettingEdit from "@/components/modules/system/setting/edit";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// interface ListProps {
//   onModalEdit?: (systemSetting: SystemSettingType) => void;
// }
// props: ListProps
export default function SystemSettingList() {
  // const { onModalEdit } = props;
  const { data, error, isLoading, mutate } = useListSwr();
  const { showModal, hideModal }: any = useContext(ModalContext);
  const theme = useTheme();

  async function onMutateComplete() {
    hideModal();
    await mutate();
  }

  // function btnEditClick(entity: SystemSettingType) {
  //   if (onModalEdit) {
  //     onModalEdit(entity);
  //   }
  // }

  function onModalEdit2(systemSettingType: SystemSettingType) {
    showModal(
      `Edit SystemSetting /${systemSettingType.settingKey}/`,
      <SystemSettingEdit
        id={systemSettingType.id}
        onComplete={onMutateComplete}
      />,
    );
  }

  function createNewClick() {
    showModal(
      "Create new SystemSetting",
      <SystemSettingNew onComplete={onMutateComplete} />,
    );
  }

  return (
    <>
      <Stack
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
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>SettingKey</TableCell>
              <TableCell>JSON</TableCell>
              <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit</TableCell>
            </TableRow>
          </TableHead>

          {typeof data === "object" && (
            <TableBody>
              {data.data &&
                data.data.map(function (systemsetting: any) {
                  return (
                    <TableRow key={`systemsetting_row_${systemsetting.id}`}>
                      <TableCell className="p-1 border border-slate-300 text-center font-bold">
                        {systemsetting.id}
                      </TableCell>
                      <TableCell>{systemsetting.settingKey}</TableCell>
                      <TableCell>
                        {JSON.stringify(systemsetting.value)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => {
                            onModalEdit2(systemsetting);
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
