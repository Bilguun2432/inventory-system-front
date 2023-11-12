"use client";

import { forwardRef, Ref, ForwardRefRenderFunction } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useListSwr } from "../api";
import { ProductConfType } from "@/types/modules/product";

interface CustomSelectProps extends SelectProps {
  label: string;
  defaultValue?: number;
}

const ProductConfSelect: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomSelectProps
> = (props: CustomSelectProps, ref: Ref<HTMLDivElement>) => {
  const { label, defaultValue, ...otherProps } = props;
  // const { data: confs, error, isLoading, mutate } = useListSwr();
  const { data: confs, error } = useListSwr();

  return (
    <>
      {confs && typeof confs[Symbol.iterator] === "function" && (
        <FormControl fullWidth>
          <InputLabel id="product_conf_select_label">{label}</InputLabel>
          <Select
            {...otherProps}
            labelId="product_conf_select_label"
            label={label}
            defaultValue={defaultValue}
            fullWidth
            size="medium"
            error={error}
            ref={ref}
          >
            {confs.map(function (productConf: ProductConfType) {
              return (
                <MenuItem
                  value={productConf.id}
                  key={`product_conf_option_${productConf.id}`}
                >
                  {productConf.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default forwardRef<HTMLDivElement, CustomSelectProps>(ProductConfSelect);
