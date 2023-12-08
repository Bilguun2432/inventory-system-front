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
import SellIcon from "@mui/icons-material/Sell";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";

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
        title: "Агуулах",
        icon: StoreIcon,
        href: "/",
      },
      {
        id: uniqueId(),
        title: "Хэрэглэгч",
        icon: PersonAddIcon,
        href: "/auth/user/",
      },
      {
        id: uniqueId(),
        title: "Хэрэглэгчийн үүрэг",
        icon: ManageAccountsIcon,
        href: "/auth/role/",
      },
      {
        id: uniqueId(),
        title: "Бүтээгдэхүүний ангилал",
        icon: CategoryIcon,
        href: "/product/category/",
      },
      {
        id: uniqueId(),
        title: "Бүтээгдэхүүн",
        icon: InventoryIcon,
        href: "/product/",
      },
      {
        id: uniqueId(),
        title: "Ажилчид",
        icon: EngineeringIcon,
        href: "/employee/",
      },
      {
        id: uniqueId(),
        title: "Эвдэрсэн бүтээгдэхүүн",
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
        title: "Хүргэгдэх бүтээгдэхүүн",
        icon: DeliveryDiningIcon,
        href: "/employee/product/",
      },
      {
        id: uniqueId(),
        title: "Зарсан бүтээгдэхүүн",
        icon: SellIcon,
        href: "/employee/sold/",
      },
      {
        id: uniqueId(),
        title: "Эвдэрсэн бүтээгдэхүүн",
        icon: ArchiveIcon,
        href: "/employee/broken/",
      },
      {
        id: uniqueId(),
        title: "Буцаагдсан бүтээгдэхүүн",
        icon: AssignmentReturnedIcon,
        href: "/employee/returned/",
      },
    ],
  },
];
export default MenuItems;
