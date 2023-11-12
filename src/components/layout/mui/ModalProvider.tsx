"use client";

import { useState, ReactNode, FC, createContext } from "react";
import ModalDialog from "./ModalDialog";
import { LayoutProps, ModalDialogProps } from "@/types/component";
import React from "react";

export interface ModalContextType {
  showModal: (title: string, content: ReactNode, size: string) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
const { Provider } = ModalContext;

const defaultModalData = {
  title: "Modal title",
  content: null,
  visible: false,
  size: "md",
};

const ModalProvider: FC<LayoutProps> = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalDialogProps>(defaultModalData);

  const showModal = (title: string, content: ReactNode, size: string = "md") => {
    const newState: ModalDialogProps = {
      title: title,
      content: content,
      visible: true,
      size: size,
    };
    setModalState(newState);
  };

  const hideModal = () => {
    const newState = { ...modalState, visible: false };
    setModalState(newState);
  };

  return (
    <>
      <Provider value={{ showModal, hideModal }}>{children}</Provider>
      <ModalDialog {...modalState} hideModal={hideModal} />
    </>
  );
};

export default ModalProvider;
export { ModalContext };
