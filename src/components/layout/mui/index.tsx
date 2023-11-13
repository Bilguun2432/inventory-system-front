import { ReactNode } from "react";
import LayoutMui from "./layout";
import ModalProvider from "./ModalProvider";

export default function index({ children }: { children: ReactNode }) {
  return (
    <LayoutMui>
      <ModalProvider>{children}</ModalProvider>
    </LayoutMui>
  );
}
