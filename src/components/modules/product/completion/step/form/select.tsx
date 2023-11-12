"use client";

import { forwardRef, Ref, ForwardRefRenderFunction } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";

interface CustomSelectProps extends SelectProps {
  label: string;
}

const completionStepType = ["PACKAGE", "PAYMENT", "NUMBER", "SIM", "CARD"];

const ProductCompletionSelect: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomSelectProps
> = (props: CustomSelectProps, ref: Ref<HTMLDivElement>) => {
  const { label, defaultValue, error, ...otherProps } = props;

  return (
    <>
      {completionStepType && (
        <FormControl fullWidth>
          <InputLabel id="product_service_type_select">{label}</InputLabel>
          <Select
            {...otherProps}
            labelId="product_service_type_select"
            label={label}
            defaultValue={defaultValue}
            fullWidth
            size="medium"
            error={error ? true : false}
            ref={ref}
          >
            {completionStepType?.map((value: string, index: number) => {
              return (
                <MenuItem
                  value={value}
                  key={`product_completion_option_${index}`}
                >
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default forwardRef<HTMLDivElement, CustomSelectProps>(
  ProductCompletionSelect,
);
