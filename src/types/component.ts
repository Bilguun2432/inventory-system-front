/* eslint-disable no-unused-vars */
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface ModalDialogProps {
  title: string;
  content: ReactNode | null;
  visible: boolean;
  size: "sm" | "md" | "lg" | "xl" | string;
}

export enum MessageType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}
