"use client";

import { forwardRef, Ref, ForwardRefRenderFunction } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useListSwr } from "../api";
import { ClientKindType } from "@/types/modules/client";

interface CustomSelectProps extends SelectProps {
  label: string;
  defaultValue?: number;
}

const ClientKindSelect: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomSelectProps
> = (props: CustomSelectProps, ref: Ref<HTMLDivElement>) => {
  const { label, defaultValue, ...otherProps } = props;
  // const { data: ClientKinds, error, isLoading, mutate } = useListSwr();
  const { data: ClientKinds, error } = useListSwr();

  return (
    <>
      {ClientKinds && (
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
            {ClientKinds.map(function (clientKinds: ClientKindType) {
              return (
                <MenuItem
                  value={clientKinds.id}
                  key={`client_kind_option_${clientKinds.id}`}
                >
                  {clientKinds.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default forwardRef<HTMLDivElement, CustomSelectProps>(ClientKindSelect);
