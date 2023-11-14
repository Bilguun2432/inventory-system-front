import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import ProductForm from "./form";
import { useCategorySwr } from "./api";

interface ProductNewProps {
  onComplete?: () => void;
}

export default function ProductNew(props: ProductNewProps) {
  const theme = useTheme();
  const { onComplete } = props;
  const { data: triggerCategory } = useCategorySwr();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleShowForm = () => {
    setFormVisible(true);
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Box sx={{ my: theme.spacing(2), flexDirection: "column", alignItems: "center" }}>
      {formVisible ? (
        <ProductForm onComplete={() => handleSubmit()} selectedCategory={triggerCategory[selectedCategory || ""]} />
      ) : (
        <>
          <Select label="Category" fullWidth defaultValue="" onChange={handleSelectChange as any}>
            {(Object.entries(triggerCategory || {}) as [string, string][]).map(([key, category]) => (
              <MenuItem key={key} value={String(key)}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={handleShowForm} sx={{ ml: 40 }} disabled={!selectedCategory}>
            Submit
          </Button>
        </>
      )}
    </Box>
  );
}
