import { uniqueId } from "lodash";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArchiveIcon from "@mui/icons-material/Archive";
import StoreIcon from "@mui/icons-material/Store";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

type MenuItem = {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
};

type MenuGroup = {
  subheader: string;
  items: MenuItem[];
};

const MenuItems: MenuGroup[] = [
  {
    subheader: "Admin",
    items: [
      {
        id: uniqueId(),
        title: "Home",
        icon: HomeIcon,
        href: "/",
      },
      {
        id: uniqueId(),
        title: "Storage",
        icon: StoreIcon,
        href: "/storage/",
      },
      {
        id: uniqueId(),
        title: "Auth",
        icon: PersonAddIcon,
        href: "/auth/user/",
      },
      {
        id: uniqueId(),
        title: "Auth Role",
        icon: ManageAccountsIcon,
        href: "/auth/role/",
      },
      {
        id: uniqueId(),
        title: "Product Category",
        icon: CategoryIcon,
        href: "/product/category/",
      },
      {
        id: uniqueId(),
        title: "Product",
        icon: InventoryIcon,
        href: "/product/",
      },
      {
        id: uniqueId(),
        title: "Employee",
        icon: EngineeringIcon,
        href: "/employee/",
      },
      {
        id: uniqueId(),
        title: "Archive",
        icon: ArchiveIcon,
        href: "/archive/",
      },
    ],
  },
  {
    subheader: "Employee",
    items: [
      {
        id: uniqueId(),
        title: "Products to be delivered",
        icon: DeliveryDiningIcon,
        href: "/employee/product",
      },
    ],
  },
];

export default MenuItems;
