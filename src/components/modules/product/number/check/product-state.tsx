"use client";

import { ChangeEvent, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useListSwr, useByProductListSwr, useToggleToProductSwr } from "./api";
import { ProductNumberCheckType, ProductType } from "@/types/modules/product";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import { AxiosResponse, AxiosError } from "axios";
import { AxiosError } from "axios";

export default function ProductNumberCheckState({
  product,
}: {
  product: ProductType;
}) {
  const { data: numberChecks } = useListSwr();
  const { data: numberChecksByProduct, mutate: mutageChecked } =
    useByProductListSwr(product.id);
  const { trigger: triggerToggle } = useToggleToProductSwr(product.id);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  useEffect(
    function () {
      if (numberChecksByProduct) {
        let i;
        const ids = [0];
        for (i in numberChecksByProduct) {
          ids.push(numberChecksByProduct[i].id);
        }
        setCheckedIds(ids);
      }
    },
    [numberChecksByProduct],
  );

  function onCheckChange(event: ChangeEvent<HTMLInputElement>) {
    const data: any = {
      id: parseInt(event.target.value),
      toggleType: event.target.checked ? "add" : "remove",
    };

    triggerToggle(data)
      // .then(function (response: AxiosResponse) {
      .then(function () {
        mutageChecked();
      })
      .catch(function (error: AxiosError) {
        console.log({ error });
      });
  }

  return (
    <>
      <FormGroup>
        {numberChecks &&
          checkedIds.length > 0 &&
          numberChecks.map(function (numberCheck: ProductNumberCheckType) {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedIds.indexOf(numberCheck.id ?? -1) > -1}
                    onChange={onCheckChange}
                    value={numberCheck.id}
                  />
                }
                label={numberCheck.name}
                key={`product_number_check_${numberCheck.id}`}
              />
            );
          })}
      </FormGroup>
    </>
  );
}
