"use client";

import { ReactNode } from "react";
import LayoutMui from "@/components/layout/mui";
import AuthProvider from "@/components/provider/auth_provider";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LayoutMui>{children}</LayoutMui>
    </AuthProvider>
  );
}
