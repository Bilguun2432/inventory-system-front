"use client";

import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import AppProvider from "@/components/provider/app_provider";
import { Inter } from "next/font/google";
import { ErrorCtx } from "@/context/fast_msg_context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Inventory System</title>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider>
          <ErrorCtx>
            <ThemeProvider theme={baselightTheme}>
              <CssBaseline />
              <AppProvider>{children}</AppProvider>
            </ThemeProvider>
          </ErrorCtx>
        </SessionProvider>
      </body>
    </html>
  );
}
