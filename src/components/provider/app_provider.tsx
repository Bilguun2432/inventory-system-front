"use client";

import { ReactNode } from "react";
import React from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
