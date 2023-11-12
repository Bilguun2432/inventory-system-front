"use client";

import { forwardRef, Ref, ForwardRefRenderFunction } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useListSwr } from "../api";
import { ProductType } from "@/types/modules/product";

interface CustomSelectProps extends SelectProps {
  label: string;
  defaultValue?: number;
}

const ClientProductSelect: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomSelectProps
> = (props: CustomSelectProps, ref: Ref<HTMLDivElement>) => {
  const { label, defaultValue, ...otherProps } = props;
  const { data: products, error } = useListSwr();

  return (
    <>
      {products && (
        <FormControl fullWidth>
          <InputLabel id="client_product_select_label">{label}</InputLabel>
          <Select
            {...otherProps}
            labelId="client_product_select_label"
            label={"Product"}
            defaultValue={defaultValue}
            fullWidth
            size="medium"
            error={error}
            ref={ref}
          >
            {products.map(function (clientProduct: ProductType) {
              return (
                <MenuItem
                  value={clientProduct.id}
                  key={`client_product_option_${clientProduct.id}`}
                >
                  {clientProduct.name}
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
  ClientProductSelect,
);
