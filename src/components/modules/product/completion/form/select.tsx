"use client";

import { forwardRef, Ref, ForwardRefRenderFunction } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useListSwr } from "../api";
import { ProductCompletionType } from "@/types/modules/product";

interface CustomSelectProps extends SelectProps {
  label: string;
  defaultValue?: number;
}

const ProductCompletionSelect: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomSelectProps
> = (props: CustomSelectProps, ref: Ref<HTMLDivElement>) => {
  const { label, defaultValue, ...otherProps } = props;
  const { data: productCompletions, error } = useListSwr();
  // const { data: productCompletions, error, isLoading, mutate } = useListSwr();

  console.log("productCompletions", productCompletions);
  return (
    <>
      {productCompletions &&
        typeof productCompletions[Symbol.iterator] === "function" && (
          <FormControl fullWidth>
            <InputLabel id="product_completion_select_label">
              {label}
            </InputLabel>
            <Select
              {...otherProps}
              labelId="product_completion_select_label"
              label={label}
              defaultValue={defaultValue}
              fullWidth
              size="medium"
              error={error}
              ref={ref}
            >
              {productCompletions.map(function (
                productCompletion: ProductCompletionType,
              ) {
                return (
                  <MenuItem
                    value={productCompletion.id}
                    key={`product_completion_option_${productCompletion.id}`}
                  >
                    {productCompletion.name}
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
