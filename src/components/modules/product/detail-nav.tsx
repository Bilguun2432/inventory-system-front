import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductNumberCheckState from "./number/check/product-state";
import ProductAttributeList from "./attribute/list";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "./image/product-list";

import { ProductAttributeType, ProductType } from "@/types/modules/product";
import { useContext } from "react";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import ProductAttributeEdit from "@/components/modules/product/attribute/edit";
import { useListSwr } from "@/components/modules/product/attribute/api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductDetailNav({
  product,
}: {
  product: ProductType;
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { showModal, hideModal }: any = useContext(ModalContext);
  const productWithId = product as ProductType & { id: number };
  const { mutate } = useListSwr(productWithId.id);
  async function onMutateComplete() {
    hideModal();
    await mutate();
  }
  function onModalEdit(productAttributeType: ProductAttributeType) {
    showModal(
      `Edit ProductAttribute /${productAttributeType.systemField}/`,
      <ProductAttributeEdit
        product={product}
        id={productAttributeType.id}
        onComplete={onMutateComplete}
      />,
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Number Checks" {...a11yProps(0)} />
              <Tab label="Images" {...a11yProps(1)} />
              <Tab label="Attribute" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ProductNumberCheckState product={product} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ImageList product={product} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ProductAttributeList onModalEdit={onModalEdit} product={product} />
          </CustomTabPanel>
        </Box>
      </CardContent>
    </Card>
  );
}
