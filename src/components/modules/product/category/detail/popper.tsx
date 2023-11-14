import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { useCategoryListSwr } from "../../category/api";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { ProductCategoryType } from "@/types/modules/product";
import Grid from "@mui/material/Grid";

export default function SimplePopper(props: {
  anchorEl: null | HTMLElement;
  setCategory: (e: any) => void;
  setCategoryList: (e: number[]) => void;
  setCategoryName: (e: string) => void;
}) {
  const { anchorEl, setCategory, setCategoryList, setCategoryName } = props;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const [categoryId, setCategoryId] = useState(0);
  const { data, isLoading, mutate } = useCategoryListSwr(categoryId);
  //   const { data: data2, isLoading: isLoading2, mutate: mutate2 } = useIndexSwr(categoryId);
  useEffect(() => {
    if (data) {
      setCategory(categoryId);
      const list = Object.keys(data).map(Number);
      console.log(list);
      list.splice(0, 1);
      setCategoryList(list);
    }
    // if (data2) setCategoryName(data2.name ?? "");
  }, [data]);
  const aF = () => {
    let name = "";
    const folders =
      data &&
      Object.keys(data).map((key: any) => {
        const item =
          data[key] &&
          data[key].length &&
          data[key].map((e: ProductCategoryType) => {
            if (
              Object.keys(data)
                .map(Number)
                .includes(e.id ?? 23123123)
            )
              name = `${name}/${e.name}`;
            return (
              <div
                onClick={() => {
                  if (e.id != categoryId) {
                    setCategoryId(e.id ?? 0);
                  } else {
                    const keys = Object.keys(data);
                    if (keys.length > 0) {
                      const lastKey = keys[keys.length - 1];
                      if (lastKey === key) {
                        setCategoryId(e.id);
                      } else {
                        setCategoryId(key);
                      }
                    }
                  }
                }}
                key={`category_id2_${e.id}`}
              >
                <Box sx={{ flexGrow: 1, mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <FolderIcon sx={{ color: blue[200] }} />
                    </Grid>
                    <Grid item xs>
                      {" "}
                      {e.name}
                    </Grid>
                    <Grid item>
                      <ArrowRightOutlinedIcon />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            );
          });

        return (
          <div className="border-r-2 border-gray-300 justify-center font-medium" key={`category_id_${key}`}>
            <div className="text-center w-40">{item}</div>
            {categoryId == key ? (
              <div style={{ backgroundColor: "#87CEFA", justifyContent: "end" }} className="border rounded text-center text-lg ">
                <button>add</button>
              </div>
            ) : null}
          </div>
        );
      });
    console.log(name);
    setCategoryName(name);
    return folders;
  };

  return (
    <Popper placement="bottom-start" style={{ zIndex: 1500 }} id={id} open={open} anchorEl={anchorEl}>
      <Box
        sx={{
          // minWidth: "200px",
          maxWidth: "1000px",
          height: "400px",
          border: 1,
          p: 1,
          bgcolor: "background.paper",
          overflowX: "auto",
        }}
      >
        Сонгосон категори: {categoryId}
        {/* <div style={{ width: "700px", backgroundColor: "green" }}>s</div> */}
        <div style={{ display: "flex", flexDirection: "row" }}>{aF()}</div>
      </Box>
    </Popper>
  );
}
