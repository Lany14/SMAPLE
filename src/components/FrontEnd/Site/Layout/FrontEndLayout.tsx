"use client";
import React from "react";
import Footer from "@/components/FrontEnd/Site/Footer";
import Header from "@/components/FrontEnd/Site/Header";
import Lines from "@/components/FrontEnd/Site/Lines";
import ScrollToTop from "@/components/FrontEnd/Site/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function FrontEndLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <Lines />
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
