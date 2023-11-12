"use client";

import { forwardRef, Ref, ForwardRefRenderFunction } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useListSwr } from "../api";
import { ProductCategoryType } from "@/types/modules/product";

interface CustomSelectProps extends SelectProps {
  label: string;
  defaultValue?: number;
}

const ProductCategorySelect: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomSelectProps
> = (props: CustomSelectProps, ref: Ref<HTMLDivElement>) => {
  const { label, defaultValue, ...otherProps } = props;
  const { data: categories, error } = useListSwr();

  return (
    <>
      {categories && typeof categories[Symbol.iterator] === "function" && (
        <FormControl fullWidth>
          <InputLabel id="product_category_select_label">{label}</InputLabel>
          <Select
            {...otherProps}
            labelId="product_category_select_label"
            label={"Category"}
            defaultValue={defaultValue}
            fullWidth
            size="medium"
            error={error}
            ref={ref}
          >
            {categories.map(function (productCategory: ProductCategoryType) {
              return (
                <MenuItem
                  value={productCategory.id}
                  key={`product_category_option_${productCategory.id}`}
                >
                  {productCategory.name}
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
  ProductCategorySelect,
);
