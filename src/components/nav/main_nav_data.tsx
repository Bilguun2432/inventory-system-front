import { ReactNode } from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HomeIcon from "@mui/icons-material/Home";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import React from "react";

export interface NavItemType {
  url?: string;
  title: string;
  Icon?: ReactNode;
  subNav?: NavItemType[];
}

export interface NavItemEventType extends NavItemType {
  key?: string;
}

const navData = [
  {
    url: "/",
    title: "Нүүр",
    Icon: <HomeIcon fontSize="small" />,
    subNav: [],
  },
  {
    title: "Бүтээгдэхүүн",
    Icon: <AllInboxIcon fontSize="small" />,
    subNav: [
      {
        url: "/product/completion",
        title: "Completion",
      },
      {
        url: "/product/conf",
        title: "Config",
      },
      {
        url: "/product/number/check",
        title: "Дугаар шалгалт",
      },
      {
        url: "/product/category",
        title: "Ангилал",
      },
      {
        url: "/product",
        title: "Бүтээгдэхүүн",
      },
    ],
  },
  {
    title: "Auth",
    Icon: <VerifiedUserIcon fontSize="small" />,
    subNav: [
      {
        url: "/auth/user",
        title: "User",
      },
      {
        url: "/auth/role",
        title: "Role",
      },
      {
        url: "/auth/permission",
        title: "Permission",
      },
    ],
  },
  {
    title: "Харилцагч",
    Icon: <AccountCircleIcon fontSize="small" />,
    subNav: [
      {
        url: "/client/kind",
        title: "Төрөл",
      },
      {
        url: "/client",
        title: "Харилцагч",
      },
      {
        url: "/client/product",
        title: "Бүтээгдэхүүн",
      },
      {
        url: "/client/account",
        title: "Данс /Харилцагч/",
      },
      // {
      //   url: "/client/account/transaction",
      //   title: "Transaction",
      // },
    ],
  },
  {
    title: "Банк систем",
    Icon: <AccountBalanceIcon fontSize="small" />,
    subNav: [
      {
        url: "/bank/account",
        title: "Дансууд",
      },
      {
        url: "/bank/transaction",
        title: "Дансны хуулга",
      },
    ],
  },
  {
    title: "Гүйлгээ",
    Icon: <ShoppingBagIcon fontSize="small" />,
    subNav: [
      {
        url: "/transaction",
        title: "Бүх гүйлгээ",
      },
      {
        url: "/transaction/product",
        title: "Бүтээгдэхүүн",
      },
      {
        url: "/transaction/invoice",
        title: "Нэхэмжлэх",
      },
      {
        url: "/transaction/log",
        title: "Лог",
      },
    ],
  },
  {
    title: "Дугаар",
    Icon: <AppSettingsAltIcon fontSize="small" />,
    subNav: [
      {
        url: "/number/kind",
        title: "Төрөл",
        subNav: [],
      },
      {
        url: "/number/prefix",
        title: "prefix",
        subNav: [],
      },
    ],
  },
  {
    title: "Contract",
    Icon: <PermContactCalendarIcon fontSize="small" />,
    subNav: [
      {
        url: "/contract/list",
        title: "Contract List",
      },
    ],
  },
  {
    url: "/system/setting",
    title: "Системийн тохиргоо",
    Icon: <SensorOccupiedIcon fontSize="small" />,
    subNav: [],
  },
];

export default navData;
