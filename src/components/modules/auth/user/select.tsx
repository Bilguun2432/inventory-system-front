"use client";

import { useListSwr } from "./api";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AuthUserType } from "@/types/modules/auth_user";
import Select, { SelectProps } from "@mui/material/Select";
import { forwardRef, Ref, ForwardRefRenderFunction } from "react";

interface CustomSelectProps extends SelectProps {
  label: string;
  defaultValue?: number;
}

const AuthUserSelect: ForwardRefRenderFunction<HTMLDivElement, CustomSelectProps> = (props: CustomSelectProps, ref: Ref<HTMLDivElement>) => {
  const { label, defaultValue, ...otherProps } = props;
  // const { data: ClientKinds, error, isLoading, mutate } = useListSwr();
  const { data: authUserModel, error } = useListSwr();
  console.log("sel=>", authUserModel);
  return (
    <>
      {authUserModel && (
        <FormControl fullWidth>
          <InputLabel id="client_kind_select_label">{label}</InputLabel>
          <Select
            {...otherProps}
            labelId="client_kind_select_label"
            label={"ClientKind"}
            defaultValue={defaultValue}
            fullWidth
            size="medium"
            error={error}
            ref={ref}
          >
            {authUserModel &&
              authUserModel.map(function (authUser: AuthUserType) {
                return (
                  <MenuItem value={authUser.id} key={`client_kind_option_${authUser.id}`}>
                    {authUser.firstname}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default forwardRef<HTMLDivElement, CustomSelectProps>(AuthUserSelect);
