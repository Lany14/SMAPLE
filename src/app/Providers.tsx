"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      {children}
    </ThemeProvider>
  );
}
