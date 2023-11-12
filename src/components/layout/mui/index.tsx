import { ReactNode } from "react";
import LayoutMui from "./Layout";
import ModalProvider from "./ModalProvider";
import React from "react";

export default function index({ children }: { children: ReactNode }) {
  return (
    <LayoutMui>
      <ModalProvider>{children}</ModalProvider>
    </LayoutMui>
  );
}
