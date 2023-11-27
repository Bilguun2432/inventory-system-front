"use client";

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useDetailSwr } from "./api";
import TransferForm from "./transferform";
import { ProductType } from "@/types/modules/product";
import { AxiosError } from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUserSwr } from "@/components/modules/auth/user/api";

interface EditProps {
  product: ProductType;
  onComplete?: () => void;
}

export default function ProductTransfer(props: EditProps) {
  const theme = useTheme();
  const { product, onComplete } = props;
  const { data, mutate } = useDetailSwr(product.id);
  const { data: triggerUser, mutate: mutate1 } = useUserSwr();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  function onUpdateComplete() {
    if (onComplete) {
      mutate();
      mutate1();
      onComplete();
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedUser(event.target.value as string);
  };

  const handleShowForm = () => {
    setFormVisible(true);
  };

  const handleSubmit = () => {
    if (onComplete) {
      onUpdateComplete();
    }
  };

  return (
    <Box sx={{ my: theme.spacing(2), flexDirection: "column", alignItems: "center" }}>
      {formVisible ? (
        <TransferForm product={data} onComplete={() => handleSubmit()} selectedUser={triggerUser[selectedUser || ""]} />
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id="user-label">Ажилчны мэйл хаяг</InputLabel>
            <Select labelId="user-label" label="Ажилчны мэйл хаяг" value={selectedUser || ""} onChange={handleSelectChange as any}>
              {(Object.entries(triggerUser || {}) as [string, string][]).map(([key, user]) => (
                <MenuItem key={key} value={key}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <Button variant="contained" onClick={handleShowForm} sx={{ ml: 40 }} disabled={!selectedUser}>
            Submit
          </Button>
        </>
      )}
    </Box>
  );
}
