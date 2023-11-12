"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
import Tooltip from "@mui/material/Tooltip";
const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/auth";

import {
  useListRoleSwr,
  useDetailAuthUserSwr,
  useCreateAuthUserRoleSwr,
} from "./api";

interface FormProps {
  id: number;
  onComplete?: () => void;
}

export default function AuthRolePermissionEdit(props: FormProps) {
  const theme = useTheme();
  const [entityLoading, setEntityLoading] = useState<boolean>(false);
  const { data, error, isLoading } = useListRoleSwr();
  const { trigger: triggerUpdate } = useCreateAuthUserRoleSwr(props.id);
  const { data: data2, mutate: mutate2 } = useDetailAuthUserSwr(props.id);

  useEffect(() => {
    if (data) {
      setEntityLoading(false);
    }
  }, [data, isLoading, error]);

  const onSubmit = async (data: any, type: boolean) => {
    if (type) {
      await axios
        .delete(
          `${urlBase}/user/${props.id}/role/${parseInt(data.roleId)}/remove`,
        )
        .then((res: AxiosResponse) => {
          const { status, data }: AxiosResponse = res;
          if (status != 200) {
            return [];
          }
          return data;
        });
    } else {
      await triggerUpdate(data);
    }
    mutate2();
  };

  return (
    <>
      <BodyStyle>
        Total role: {data && data.data.length} &nbsp; User role:
        {data2 && data2.roles && data2.roles.length}
      </BodyStyle>

      <TableContainer
        color="red"
        sx={{
          display: "flex",
          mb: theme.spacing(2),
          borderRadius: "20px",
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>description</TableCell>
              <TableCell>toggle</TableCell>
            </TableRow>
          </TableHead>
          {data &&
            data.data &&
            data.data.map((e: any) => (
              <Tooltip
                key={`auth__user_role__detail_row_${e.id}`}
                title={e.description}
                arrow
              >
                <TableBody>
                  <TableRow>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.description}</TableCell>
                    <TableCell>
                      {data2 &&
                      data2.roles &&
                      data2.roles
                        .map((activeRole: any) => {
                          return activeRole.id === e.id;
                        })
                        .includes(true) ? (
                        <FormControlLabel
                          onChange={() => onSubmit({ roleId: e.id }, true)}
                          control={<Switch checked={true} />}
                          label="true"
                        />
                      ) : (
                        <FormControlLabel
                          onChange={() => onSubmit({ roleId: e.id }, false)}
                          control={<Switch checked={false} />}
                          label="false"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Tooltip>
            ))}
        </Table>
      </TableContainer>
    </>
  );
}

const BodyStyle = styled("div")(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  fontSize: "20px",
  fontWeight: "bold",
  paddingLeft: "10px",
  paddingBottom: "10px",
}));
