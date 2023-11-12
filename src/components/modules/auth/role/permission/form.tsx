"use client";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "@/lib/axios/admn/axios";
import { AxiosResponse } from "axios";
const entryPoint = process.env.NEXT_PUBLIC_ADMN_URL ?? "";
const urlBase = entryPoint + "/auth";

import {
  useListPermissionSwr,
  useDetailRoleSwr,
  useCreateAuthRolePermissionSwr,
} from "./api";

interface PermissionItem {
  id: number;
  name: string;
  permissionKey: string;
  description: string;
  group_name: string;
}

interface GroupObject {
  name: string;
  list: PermissionItem[];
}

interface FormProps {
  id: number;
}

export default function AuthRolePermissionEdit(props: FormProps) {
  // const [entityLoading, setEntityLoading] = useState<boolean>(false);
  const { data, error, isLoading } = useListPermissionSwr();
  const { trigger: triggerUpdate } = useCreateAuthRolePermissionSwr(props.id);
  const { data: data2, mutate: mutate2 } = useDetailRoleSwr(props.id);

  const [obj, setObj] = useState<GroupObject[]>([]);

  useEffect(() => {
    if (data) {
      const updatedObj: GroupObject[] = [];
      data.permission.forEach((e: PermissionItem) => {
        const existingGroupIndex = updatedObj.findIndex(
          (group) => group.name === e.group_name,
        );
        if (existingGroupIndex === -1) {
          updatedObj.push({ name: e.group_name, list: [e] });
        } else {
          updatedObj[existingGroupIndex].list.push(e);
        }
      });
      setObj(updatedObj);
    }
  }, [data, isLoading, error]);

  const onSubmit = async (data: any, type: boolean) => {
    // console.log("on sub", data, type, props.id);
    if (type) {
      await axios
        .delete(
          `${urlBase}/role/${props.id}/permission/${parseInt(
            data.permissionId,
          )}/remove`,
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
  // console.log("obj", obj);
  // console.log("data", data);
  // console.log("data2", data2);

  return (
    <>
      {/* {data2 && (
        <div>
          <div> role Id: {data2.id}</div>
          <div> role name: {data2.name}</div>
          <div> role description: {data2.description}</div>
        </div>
      )} */}
      <BodyStyle>total group: {obj.length}</BodyStyle>

      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {obj.map((group) => (
              <Grid item key={group.name} style={{ width: "400px" }}>
                <Item>
                  <HeadStyle>{group.name}</HeadStyle>
                  <div>
                    {group.list.map((e) => (
                      <div key={`authrole_permission_detail_row_${e.id}`}>
                        <Tooltip title={e.description} arrow>
                          <BodyStyle>
                            <div>{e.name}</div>
                            <div>
                              {data2 &&
                              data2.permissions &&
                              data2.permissions
                                .map((activePermission: any) => {
                                  return activePermission.id === e.id;
                                })
                                .includes(true) ? (
                                <FormControlLabel
                                  onChange={() =>
                                    onSubmit({ permissionId: e.id }, true)
                                  }
                                  control={<Switch checked={true} />}
                                  label=""
                                />
                              ) : (
                                <FormControlLabel
                                  onChange={() =>
                                    onSubmit({ permissionId: e.id }, false)
                                  }
                                  control={<Switch checked={false} />}
                                  label=""
                                />
                              )}
                            </div>
                          </BodyStyle>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // paddingTop: theme.spacing(2),
  textAlign: "center",
  // color: theme.palette.text.secondary,
  color: "black",
  borderRadius: "20px",
  backgroundColor: "#D8EBF0",
}));

const HeadStyle = styled("div")(({ theme }) => ({
  fontSize: "25px",
  textAlign: "center",
  fontWeight: "bold",
  backgroundColor: "#34A5FB",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
  paddingTop: theme.spacing(2),
}));

const BodyStyle = styled("div")(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  fontSize: "20px",
  fontWeight: "bold",
  paddingLeft: "30px",
  paddingRight: "30px",
  paddingBottom: "10px",
  paddingTop: theme.spacing(2),
}));
